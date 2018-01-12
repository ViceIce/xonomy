declare namespace Xonomy {
    interface XonomyStatic {
        readonly mode: 'nerd' | 'laic';
        lang: 'en' | 'de' | string;
        readonly warnings: IWarning[];

        render(
            data: XMLDocument | string,
            editor: Element | string,
            docSpec: IXmlSpec
        ): void;
        harvest(): string;
        setMode(mode: 'nerd' | 'laic'): void;

        textByLang(val: string): string;

        replace(htmlID: string, jsNode: ISurrogate): void;
        harvestElement(
            div: HTMLElement,
            parent: IElementSurrogate
        ): IElementSurrogate;
        harvestAttribute(
            div: HTMLElement,
            parent: IElementSurrogate
        ): IAttributeSurrogate;
        harvestText(
            div: HTMLElement,
            parent: IElementSurrogate
        ): ITextSurrogate;

        readonly newElementChild: IAction;
        readonly deleteElement: IAction;

        readonly newElementBefore: IAction;
        readonly newElementAfter: IAction;

        readonly newAttribute: IAction;
        readonly deleteAttribute: IAction;

        readonly editRaw: IAction;
        readonly wrap: IAction;
        readonly unwrap: IAction;

        readonly askString: IAsker;
        readonly askLongString: IAsker;
        readonly askPicklist: IAsker;
        readonly askOpenPicklist: IAsker;
        readonly askRemote: IAsker;
    }

    interface IWarning {
        htmlID: string;
        text: string;
    }

    interface IFunc<TArg = any, TResult = any> {
        (obj?: TArg): TResult;
    }

    type SurrogateFunc<
        TResult,
        TArgument extends ISurrogate = ISurrogate
    > = Func<TArgument, TResult>;

    type BoolFunc<T extends ISurrogate = ISurrogate> = boolean | IFunc<T, boolean>;

    type Func<TArg, TResult> = TResult | IFunc<TArg, TResult>;

    interface IXmlSpec {
        onchange?(): void;
        validate?(obj: IElementSurrogate): void;

        elements?: { [name: string]: IXmlSpecElement };
        allowModeSwitching?: boolean;

        unknownElement?: Func<string, IXmlSpecElement>;
        unknownAttribute?: Func<string, IXmlSpecAttribute>;
    }

    interface IXmlSpecItem<T extends ISurrogate = ISurrogate> extends IMenu<T> {
        displayName?: string | SurrogateFunc<string, T>;
        displayValue?: SurrogateFunc<string, T>;

        title?: string | SurrogateFunc<string, T>;
        caption?: string | SurrogateFunc<string, T>;

        isReadOnly?: BoolFunc<T>;
        isInvisible?: BoolFunc<T>;

        asker?: IAsker<IAttributeSurrogate>;
        askerParameter?: any;
    }

    interface IXmlSpecElement extends IXmlSpecItem<IElementSurrogate> {
        oneliner?: BoolFunc<IElementSurrogate>;

        backgroundColour?: string;

        attributes?: { [name: string]: IXmlSpecAttribute };

        canDropTo?: string[];
        localDropOnly?: BoolFunc<IElementSurrogate>;

        collapsible?: SurrogateFunc<boolean, IElementSurrogate>;
        collapsoid?: SurrogateFunc<string, IElementSurrogate>;
        collapsed?: SurrogateFunc<boolean, IElementSurrogate>;

        hasText?: BoolFunc<IElementSurrogate>;

        inlineMenu?: IMenuItem<ITextSurrogate>[];

        mustBeBefore?: string[] | SurrogateFunc<string[], IElementSurrogate>;
        mustBeAfter?: string[] | SurrogateFunc<string[], IElementSurrogate>;
    }

    interface IXmlSpecAttribute extends IXmlSpecItem<IAttributeSurrogate> {
        shy?: BoolFunc<IAttributeSurrogate>;
    }

    interface IMenu<T extends ISurrogate = ISurrogate> {
        menu?: IMenuItem<T>[];
    }

    interface IMenuItem<T extends ISurrogate = ISurrogate> extends IMenu<T> {
        caption: string | SurrogateFunc<string, T>;
        action?: IAction;
        actionParameter?: string | string[] | { [key: string]: any };
        hideIf?: SurrogateFunc<boolean, T>;
    }

    interface IAction<T = any> {
        (htmlID: string, actionParameter: T): void;
    }

    interface IAsker<T extends ISurrogate = ISurrogate> {
        (defaultString: string, askerParameter: any, jsMe: T): string;
    }

    interface ISurrogate {
        readonly type: 'element' | 'attribute' | 'text' | 'cdata';
        readonly htmlID: string;

        parent(): IElementSurrogate;
    }

    interface IElementSurrogate extends ISurrogate {
        readonly type: 'element';
        readonly name: string;

        readonly attributes: IAttributeSurrogate[];
        readonly children: (IElementSurrogate | ITextSurrogate)[];

        hasAttribute(name: string): boolean;
        getAttribute(name: string): IAttributeSurrogate;

        getAttributeValue(name: string, ifNull: any): any;

        hasElements(): boolean;
        hasChildElement(name: string): boolean;
        getChildElements(name: string): IElementSurrogate[];
        getDescendantElements(name: string): IElementSurrogate[];

        getText(): string;
    }

    interface IAttributeSurrogate extends ISurrogate {
        readonly type: 'attribute';
        readonly name: string;
        readonly value: string;
    }

    interface ITextSurrogate extends ISurrogate {
        readonly type: 'text' | 'cdata';
        readonly value: string;
    }
}

declare const Xonomy: Xonomy.XonomyStatic;

export default Xonomy;
