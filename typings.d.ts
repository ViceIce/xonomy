declare namespace Xonomy {
    interface XonomyStatic {
        mode: 'nerd' | 'laic';

        render(data: string, editor: Element, docSpec: IXmlSpec): void;
        harvest(): string;
        setMode(mode: 'nerd' | 'laic'): void;

        newElementChild: IAction;
        newAttribute: IAction;
        deleteElement: IAction;
        newElementBefore: IAction;
        newElementAfter: IAction;

        deleteAttribute: IAction;

        askString: IAsker;
        askPicklist: IAsker;
    }

    interface ISurrogateFunc<T, V = ISurrogate> {
        (obj?: V): T;
    }

    type BoolFunc = boolean | ISurrogateFunc<boolean>;

    interface IXmlSpec {
        onchange?(): void;
        validate?(obj): void;
        elements?: { [name: string]: IXmlSpecElement };
        allowModeSwitching?: boolean;
    }

    interface IXmlSpecElement extends IMenu {
        oneliner?: boolean;
        displayName?: string | ISurrogateFunc<string, IElementSurrogate>;

        canDropTo?: string[];
        attributes?: { [name: string]: IXmlSpecAttribute };
        collapsed?(): boolean;

        hasText?: BoolFunc;

        isReadOnly?: BoolFunc;

        mustBeBefore?: string[];
        mustBeAfter?: string[];
    }

    interface ISurrogate {
        type: 'element' | 'attribute' | 'text';
        name: string;
        value: string;
        hasAttribute(name: string): boolean;
        hasChildElement(name: string): boolean;
    }

    interface IElementSurrogate extends ISurrogate {
        type: 'element';
    }

    interface IAttributeSurrogate extends ISurrogate {
        type: 'attribute';
    }

    interface IXmlSpecAttribute extends IMenu {
        asker: IAsker;
        askerParameter?: any;
        isReadOnly?: BoolFunc;
        isInvisible?: BoolFunc;
    }

    interface IMenu {
        menu?: IMenuItem[];
    }

    interface IMenuItem extends IMenu {
        caption: string;
        action?: IAction;
        actionParameter?: string | string[] | { [key: string]: any };
        hideIf?: ISurrogateFunc<boolean>;
    }

    interface IAction {}

    interface IAsker {}
}

declare const Xonomy: Xonomy.XonomyStatic;

export default Xonomy;
