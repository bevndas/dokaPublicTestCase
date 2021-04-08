type percentage = string;

type color = number[];

type ProgressCallback = (event: ProgressEvent) => void;

interface Vector {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Shape {
    x?: number | percentage;
    y?: number | percentage;
    width?: number | percentage;
    height?: number | percentage;
    left?: number | percentage;
    top?: number | percentage;
    right?: number | percentage;
    bottom?: number | percentage;
    rx?: number | percentage;
    ry?: number | percentage;
    x1?: number | percentage;
    y1?: number | percentage;
    x2?: number | percentage;
    y2?: number | percentage;
    x3?: number | percentage;
    y3?: number | percentage;
    strokeColor: color;
    strokeWidth?: number | percentage;
    cornerRadius?: number | percentage;
    fontSize?: number | percentage;
    fontFamily?: string;
    lineHeight?: number;
    textAlign?: undefined | 'left' | 'center' | 'right';
    text?: string;
    aspectRatio?: number;
    rotation?: number;
    points?: Vector[];
    color: color;
    backgroundColor?: color;
    readonly context?: Rect | Size;
    lineStart?:
        | undefined
        | 'bar'
        | 'arrow'
        | 'arrow-solid'
        | 'square'
        | 'square-solid'
        | 'circle'
        | 'circle-solid';
    lineEnd?:
        | undefined
        | 'bar'
        | 'arrow'
        | 'arrow-solid'
        | 'square'
        | 'square-solid'
        | 'circle'
        | 'circle-solid';
    isSelected?: boolean;
    readonly isDraft?: boolean;
    readonly isComplete?: boolean;
    readonly isError?: boolean;
    readonly isLoading?: boolean;
    readonly isEditing?: boolean;
    readonly isFormatted?: boolean;
    disableStyle?: boolean | string[];
    disableErase?: boolean;
    disableSelect?: boolean;
    disableRemove?: boolean;
    disableDuplicate?: boolean;
    disableReorder?: boolean;
    disableFlip?: boolean;
    disableInput?: boolean | ((text: string) => string);
    disableManipulate?: boolean;
    disableMove?: boolean;
    disableResize?: boolean;
    disableRotate?: boolean;
}

interface ShapeControlConfiguration {
    // A mapping of a shapeProperty to a Component
    [shapeProperty: string]: [
        // Component to use
        any,

        // Component properties to map
        {
            title?: string | Function;
            label?: string | Function;
            options?: any[];
            optionIconStyle?: string | Function;
            optionLabelStyle?: string | Function;
        }
    ];
}

type StickerSrc = string; // emoji or URL

interface StickerTemplate {
    thumb?: StickerSrc;
    src?: StickerSrc;
    width?: number;
    height?: number;
    alt?: string;
    disabled?: boolean;
    shape?: Shape;
    mount?: (
        element: HTMLElement,
        sticker: StickerTemplate
    ) => { update?: (sticker: StickerTemplate) => void; destroy?: () => void };
}

type Sticker = StickerSrc | StickerTemplate;

type Filter = () => number[];

type ImageSource = File | Blob | string | HTMLImageElement | HTMLCanvasElement;

interface Effect {
    base: number;
    min: number;
    max: number;
    getLabel?: Function;
    getStore: Function;
    getValue: (store: any) => number;
    setValue: ({ update: Function }, value: number) => void;
}

interface EditorMethods {
    on: (event: string, cb: (detail?: any) => void) => void;
    destroy: () => void;
    loadImage: (src: ImageSource, options: ImageOptions) => Promise<DokaDefaultImageReaderResult>;
    editImage: (src: ImageSource, options: ImageOptions) => Promise<DokaDefaultImageWriterResult>;
    processImage: () => Promise<DokaDefaultImageWriterResult>;
    abortProcessImage: () => void;
    undo: () => void;
    redo: () => void;
    revert: () => void;
    close: () => void;
}

type CropOption = [number | undefined, string];

type SizeOption = [[number, number], string];

type CropPresetOption = CropOption | SizeOption;

type OptionGroup = [string, any[], any?];

interface CropPluginOptions {
    cropAutoCenterImageSelectionTimeout?: undefined | number;
    cropEnableButtonFlipHorizontal?: boolean;
    cropEnableButtonFlipVertical?: boolean;
    cropEnableButtonRotateLeft?: boolean;
    cropEnableButtonRotateRight?: boolean;
    cropEnableButtonToggleCropLimit?: boolean;
    cropEnableCenterImageSelection?: boolean;
    cropEnableImageSelection?: boolean;
    cropEnableInfoIndicator?: boolean;
    cropEnableLimitWheelInputToCropSelection?: boolean;
    cropEnableRotationInput?: boolean;
    cropEnableSelectPreset?: boolean;
    cropEnableZoomInput?: boolean;
    cropEnableZoomMatchImageAspectRatio?: boolean;
    cropEnableZoomTowardsWheelPosition?: boolean;
    cropImageSelectionCornerStyle?: undefined | 'hook' | 'round';
    cropSelectPresetOptions?: OptionGroup[] | CropPresetOption[];
}

interface AnnotatePluginOptions {
    annotateActiveTool?: string;
    annotateEnableButtonFlipVertical?: boolean;
    annotateShapeControls?: ShapeControlConfiguration;
    annotateToolShapes?: { [toolKey: string]: [Shape, any] };
    annotateTools?: [string, string | Function, { icon?: string }?][];
    annotatePresets?: Sticker[];
}

interface DecoratePluginOptions {
    decorateActiveTool?: string;
    decorateEnableButtonFlipVertical?: boolean;
    decorateShapeControls?: ShapeControlConfiguration;
    decorateToolShapes?: { [toolKey: string]: [Shape, any] };
    decorateTools?: [string, string | Function, { icon?: string }?][];
    decoratePresets?: Sticker[];
}

interface FilterPluginOptions {
    filterFunctions?: { [filterKey: string]: Filter };
    filterOptions?: any;
}

interface FinetunePluginOptions {
    finetuneControlConfiguration?: { [key: string]: Effect };
    finetuneOptions?: any;
}

interface ResizePluginOptions {
    resizeMaxSize?: Size;
    resizeMinSize?: Size;
}

interface StickerPluginOptions {
    stickers?: Sticker[];
    stickerStickToImage?: boolean;
    stickersEnableButtonFlipVertical?: boolean;
}

interface ImageOptions {
    readonly size: Size;
    readonly aspectRatio: number;
    readonly cropSize: Size;
    readonly cropRectAspectRatio: number;
    readonly file: File;
    readonly loadState: any;
    readonly processState: any;
    readonly rotationRange: number[];
    backgroundColor?: Number[];
    colorMatrix?: Number[];
    convolutionMatrix?: Number[];
    crop?: Rect;
    cropAspectRatio?: number | undefined;
    cropLimitToImage?: boolean;
    cropMaxSize?: Size;
    cropMinSize?: Size;
    annotation?: Shape[];
    decoration?: Shape[];
    flipX?: boolean;
    flipY?: boolean;
    gamma?: number;
    noise?: number;
    rotation?: number;
    vignette?: number;
    targetSize?: Size;
    state?: any;
}

interface EditorImageOptionsReadonly {
    readonly imageSize: Size;
    readonly imageAspectRatio: number;
    readonly imageCropSize: Size;
    readonly imageCropRectAspectRatio: number;
    readonly imageFile: File;
    readonly imageLoadState: any;
    readonly imageProcessState: any;
    readonly imageRotationRange: number[];
}

interface EditorImageOptions {
    imageBackgroundColor?: Number[];
    imageColorMatrix?: Number[];
    imageConvolutionMatrix?: Number[];
    imageCrop?: Rect;
    imageCropAspectRatio?: number | undefined;
    imageCropLimitToImage?: boolean;
    imageCropMaxSize?: Size;
    imageCropMinSize?: Size;
    imageAnnotation?: Shape[];
    imageDecoration?: Shape[];
    imageFlipX?: boolean;
    imageFlipY?: boolean;
    imageGamma?: number;
    imageNoise?: number;
    imageRotation?: number;
    imageVignette?: number;
    imageTargetSize?: Size;
    imageState?: any;
}

interface EditorOptionsReadonly {
    readonly element?: HTMLElement;
    readonly stores?: any[];
    readonly images?: any;
}

type DokaNode = [
    any,
    string,
    {
        [key: string]: any;
    }?
];

interface EditorOptions {
    id?: string;
    class?: string;
    animations?: boolean;
    locale: any;
    src?: ImageSource;
    util?: string;
    utils?: string[];
    elasticityMultiplier?: number;
    imageReader: any[];
    imageWriter?: any[];
    imageOrienter?: any;
    imageSourceToImageData?: (src: any) => Promise<ImageData>;
    previewImageDataMaxSize?: Size;
    previewUpscale?: boolean;
    enableButtonClose?: boolean;
    enableButtonExport?: boolean;
    enableButtonResetHistory?: boolean;
    enableButtonRevert?: boolean;
    enableNavigateHistory?: boolean;
    enableToolbar?: boolean;
    enableUtils?: boolean;
    enableDropImage?: boolean;
    handleEvent?: (type: string, detail: any) => void;
    willRevert?: () => Promise<Boolean>;
    willRenderCanvas?: (
        shapes: {
            decorationShapes: Shape[];
            annotationShapes: Shape[];
            interfaceShapes: Shape[];
        },
        state: any
    ) => {
        decorationShapes: Shape[];
        annotationShapes: Shape[];
        interfaceShapes: Shape[];
    };
    willRenderToolbar?: (toolbar: DokaNode[], env: any) => DokaNode[];
    beforeSelectShape?: (current: Shape | undefined, target: Shape) => Boolean;
    beforeDeselectShape?: (current: Shape, target: Shape | undefined) => Boolean;
    beforeAddShape?: (shape: Shape) => Boolean;
    beforeRemoveShape?: (shape: Shape) => Boolean;
    willRenderShapeControls?: (controls: DokaNode[], shapeId: string) => DokaNode[];
}

interface DokaImageEditorOptions
    extends EditorOptions,
        EditorImageOptions,
        AnnotatePluginOptions,
        CropPluginOptions,
        DecoratePluginOptions,
        FilterPluginOptions,
        FinetunePluginOptions,
        StickerPluginOptions {}

interface DokaImageEditor
    extends EditorMethods,
        DokaImageEditorOptions,
        EditorOptionsReadonly,
        EditorImageOptionsReadonly {}

interface DokaImageEditorModalOptions {
    preventZoomViewport?: boolean;
    modal: HTMLElement;
}

interface DokaImageEditorModal extends DokaImageEditor, DokaImageEditorModalOptions {
    show: () => void;
    hide: () => void;
}

// Doka default image reader and writer
interface DokaDefaultImageReaderResult {
    readonly src: ImageSource;
    readonly dest: File;
    readonly size: Size;
}

interface DokaDefaultImageWriterResult {
    readonly src: ImageSource;
    readonly dest: File;
    readonly imageState: any;
    readonly store: any;
}

interface DokaTargetSize {
    width?: number;
    height?: number;
    fit?: 'contain' | 'cover' | 'force';
    upscale?: boolean;
}

interface DokaDefaultImageReaderOptions {
    orientImage?: boolean;
    outputProps?: string[];
    preprocessImageFile?: (file: File, options: any, onprogress: ProgressCallback) => Promise<File>;
}

interface DokaDefaultImageWriterOptions {
    canvasMemoryLimit?: number;
    orientImage?: boolean;
    copyImageHead?: boolean;
    mimeType?: string;
    quality?: number;
    renameFile?: (file: File) => string;
    targetSize?: DokaTargetSize;
    store?:
        | string
        | ((imageState: any, options: any, onprogress: ProgressCallback) => Promise<any>);
    outputProps?: string[];
    preprocessImageState?: (
        imageState: any,
        options: any,
        onprogress: ProgressCallback
    ) => Promise<any>;
    postprocessImageData?: (
        imageData: any,
        options: any,
        onprogress: ProgressCallback
    ) => Promise<ImageData>;
}

interface DokaImageOrienter {
    read: (file: Blob | File, onprogress?: ProgressCallback) => Promise<number>;
    apply: (imageData: ImageData, orientation: number) => ImageData;
}

// Doka exports
export const setPlugins: (...plugins: any) => void;

export const appendEditor: (
    target: HTMLElement | string,
    options?: DokaImageEditorOptions
) => DokaImageEditor;

export const appendEditors: (
    target: HTMLElement | string,
    options?: DokaImageEditorOptions
) => DokaImageEditor[];

export const overlayEditor: (
    target: HTMLElement | string,
    options?: DokaImageEditorOptions
) => DokaImageEditor;

export const openEditor: (options: DokaImageEditorOptions) => DokaImageEditorModal;

export const defineCustomElements: () => Promise<DokaImageEditor>;

export const processImage: (
    src: ImageSource,
    options: DokaImageEditorOptions
) => Promise<DokaDefaultImageWriterResult>;

export const createDefaultImageReader: (options?: DokaDefaultImageReaderOptions) => any[];

export const createDefaultImageWriter: (options?: DokaDefaultImageWriterOptions) => any[];

export const createDefaultImageOrienter: () => DokaImageOrienter;

// utils
export const degToRad: (deg: number) => number;
export const colorStringToColorArray: (color: string) => number[];
export const legacyDataToImageState: (data: any) => ImageOptions;
export const dispatchEditorEvents: (
    editor: DokaImageEditor,
    element: HTMLElement,
    options?: { prefix?: string }
) => any[];
export const blobToFile: (blob: Blob) => File;
export const isSupported: () => Boolean;

// locale
export const locale_en_gb: any;

// plugins
export const plugin_annotate: any;
export const plugin_crop: any;
export const plugin_decorate: any;
export const plugin_filter: any;
export const plugin_finetune: any;
export const plugin_resize: any;
export const plugin_sticker: any;

export const plugin_annotate_defaults: any;
export const plugin_crop_defaults: any;
export const plugin_decorate_defaults: any;
export const plugin_filter_defaults: any;
export const plugin_finetune_defaults: any;
export const plugin_resize_defaults: any;
export const plugin_sticker_defaults: any;

export const plugin_annotate_locale_en_gb: any;
export const plugin_crop_locale_en_gb: any;
export const plugin_decorate_locale_en_gb: any;
export const plugin_filter_locale_en_gb: any;
export const plugin_finetune_locale_en_gb: any;
export const plugin_resize_locale_en_gb: any;
export const plugin_sticker_locale_en_gb: any;

export const component_shape_editor_locale_en_gb: any;
