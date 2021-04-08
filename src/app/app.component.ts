import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// doka
import {
    // editor
    locale_en_gb,
    createDefaultImageReader,
    createDefaultImageWriter,

    // plugins
    setPlugins,
    plugin_crop,
    plugin_crop_locale_en_gb,
    plugin_crop_defaults,
    plugin_finetune,
    plugin_finetune_locale_en_gb,
    plugin_finetune_defaults,
    plugin_filter,
    plugin_filter_locale_en_gb,
    plugin_filter_defaults,
    plugin_annotate,
    plugin_annotate_defaults,
    plugin_annotate_locale_en_gb,
    plugin_sticker,
    plugin_sticker_locale_en_gb,
    plugin_sticker_defaults,
    component_shape_editor_locale_en_gb,
} from '../../local_modules/doka';

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate, plugin_sticker);
const STICKER_URL = '../assets/';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent {
    redFrame = `${STICKER_URL}thinSquareFrameRed.png`;
    whiteFrame = `${STICKER_URL}thinSquareFrameWhite.png`;
    constructor(private sanitizer: DomSanitizer) {}

    // editor generic state
    editorOptions: any = {
        imageReader: createDefaultImageReader(),
        imageWriter: createDefaultImageWriter(),
        ...plugin_crop_defaults,
        ...plugin_finetune_defaults,
        ...plugin_filter_defaults,
        ...plugin_annotate_defaults,
        ...plugin_sticker_defaults,
        locale: {
            ...locale_en_gb,
            ...plugin_crop_locale_en_gb,
            ...plugin_finetune_locale_en_gb,
            ...plugin_filter_locale_en_gb,
            ...plugin_annotate_locale_en_gb,
            ... plugin_sticker_locale_en_gb,
            ...component_shape_editor_locale_en_gb,
        },
        stickers: [
            [
                'Frames',
                [
                    {
                        src: this.redFrame,
                        height: 100,
                        width: 100,
                        alt: 'One'
                    },
                    {
                        src: this.whiteFrame,
                        height: 100,
                        width: 100,
                        alt: 'One'
                    },
                ]
            ],
            [
                'Emoji',
                [  {
                    src: '../assets/loveFace.png',
                    width: 100,
                    height: 100,
                    alt: 'Number one',
                }]
            ]

        ]
    };

    // inline
    inlineSrc: string = 'assets/image.jpeg';
    inlineResult: string = undefined;

    handleInlineLoad($event) {
        console.log('inline load', $event);
    }

    handleInlineProcess($event) {
        console.log('inline process', $event);
        const objectURL = URL.createObjectURL($event.dest);
        this.inlineResult = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL) as string;
    }

    // modal
    modalSrc: string = 'assets/image.jpeg';
    modalResult: string = undefined;
    modalVisible: boolean = false;

    handleModalLoad($event) {
        console.log('modal load', $event);
    }

    handleModalProcess($event) {
        console.log('modal process', $event);
        const objectURL = URL.createObjectURL($event.dest);
        this.modalResult = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL) as string;
    }

    // overlay
    overlaySrc: string = 'assets/image.jpeg';
    overlayVisible: boolean = false;
    overlayResult: string = undefined;
    overlayOptions: any = {
        imageReader: createDefaultImageReader(),
        imageWriter: createDefaultImageWriter(),
        locale: {
            ...locale_en_gb,
            ...plugin_crop_locale_en_gb,
        },
        stickers: [
            [
                'Frames',
                [
                    {   thumb: '../assets/thinSquareFrameWhite.svg',
                        alt: 'Number one',
                        shape: {
                            backgroundImage: '../assets/thinSquareFrameWhite.svg',
                            width: '100%',
                            height: '100%',
                            aspectRatio: 1,
                        }
                    },
                    {   thumb: '../assets/thickSquareFrameWhite.svg',
                        alt: 'Number two',
                        shape: {
                            backgroundImage: '../assets/thickSquareFrameWhite.svg',
                            width: '100%',
                            height: '100%',
                            aspectRatio: 1,
                        }
                    },
                    {
                        thumb: '../assets/thinSquareFrameBlack.svg',
                        alt: 'Number three',
                        shape: {
                            backgroundImage: '../assets/thinSquareFrameBlack.svg',
                            width: '100%',
                            height: '100%',
                            aspectRatio: 1,
                        }
                    },
                    {
                        thumb: '../assets/thinSquareFrameRed.svg',
                        alt: 'Number four',
                        shape: {
                            backgroundImage: '../assets/thinSquareFrameRed.svg',
                            width: '100%',
                            height: '100%',
                            aspectRatio: 1,
                        }
                    },
                    {
                        thumb: '../assets/thickSquareFrameBlack.svg',
                        alt: 'Number one',
                        shape: {
                            backgroundImage: '../assets/thickSquareFrameBlack.svg',
                            width: '100%',
                            height: '100%',
                            aspectRatio: 1,
                        }
                    },
                    {
                        thumb: '../assets/thinSquareFrameRed.svg',
                        alt: 'Number five',
                        shape: {
                            backgroundImage: '../assets/thinSquareFrameRed.svg',
                            width: '100%',
                            height: '100%',
                            aspectRatio: 1,
                        }
                    },
                ]
            ],
            [
                'Emoji',
                [  {
                    src: '../assets/loveFace.png',
                    width: 100,
                    height: 100,
                    alt: 'Number one',
                }]
            ]

        ]
    };

    handleOverlayLoad($event) {
        console.log('overlay load', $event);
    }

    handleOverlayProcess($event) {
        const objectURL = URL.createObjectURL($event.dest);
        this.overlayResult = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL) as string;
        this.overlayOptions = {
            ...this.overlayOptions,
            imageState: $event.imageState,
        };

        this.overlayVisible = false;
    }
}
