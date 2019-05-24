import {
    AfterViewInit, ApplicationRef,
    Component,
    ComponentFactoryResolver, EmbeddedViewRef, Injector,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {BoatComponent} from './boat/boat.component';
import {GalleryComponent, GalleryItem, ImageItem} from '@ngx-gallery/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    galleryImages: Array<GalleryItem[]> = [];

    string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Vivamus quis ligula efficitur, tristique [gallery id='123'][/gallery] tellus at, rhoncus magna.
    Donec id posuere leo. Proin diam erat, interdum in tincidunt sit amet,
    lobortis quis erat. Morbi nec mauris sollicitudin, [gallery id='123'][/gallery] bibendum nisi condimentum,
    lacinia tortor. Cras eu elementum metus, eu tincidunt sapien. Sed consequat
    eleifend consequat. Praesent leo enim, [gallery id='123'][/gallery] condimentum sit amet interdum ac,
    laoreet vel turpis. Phasellus eu ex quis [gallery id='123'][/gallery] turpis placerat blandit.
    Sed nec lorem nec felis finibus faucibus. Pellentesque dignissim leo eget nisl maximus rutrum.`;


    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {


    }

    ngAfterViewInit(): void {

        // string to array
        const resultArr = [];
        let index = 0;
        for (let cs = 0; cs < this.string.length; cs++) {
            if (resultArr[index] === undefined) {
                resultArr[index] = '';
            }
            resultArr[index] += this.string[cs];
            if (this.string[cs] === '[' && this.string[cs + 1] === 'g') {
                // Detect the start of a gallery string
                index++;
                resultArr[index] = '';
                resultArr[index] += this.string[cs];

            }
            if (this.string[cs - 1] === 'y' && this.string[cs] === ']') {
                // Detect the end of a gallery string
                index++;
            }
        }

        console.log('resultArr', resultArr);

        // create the elements
        const element = document.getElementById('main_container');
        let galleryIndex = 0;
        for (let cE = 0; cE < resultArr.length; cE++) {

            if (resultArr[cE].includes('[gallery')) {

                this.galleryImages[galleryIndex] = [
                    new ImageItem({ src: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', thumb: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }),
                    new ImageItem({ src: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', thumb: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' })
                ];

                const dynamicEl = document.createElement('div');
                console.log('GALLERY ELEMENT', dynamicEl);
                const factory = this.componentFactoryResolver.resolveComponentFactory(GalleryComponent);
                const componentRef = factory.create(this.injector);
                componentRef.instance.items = this.galleryImages[galleryIndex];
                componentRef.instance.id = galleryIndex.toString();
                this.appRef.attachView(componentRef.hostView);
                dynamicEl.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);

                element.appendChild(dynamicEl);

                galleryIndex++;
            } else {
                const dynamicEl = document.createTextNode(resultArr[cE]);
                // resultArr[cE]
                console.log('NORMAL ELEMENT', dynamicEl);

                element.appendChild(dynamicEl);
            }

        }

    }

}
