export class ShaderUtils {
    get glsl() {
        return `${this._varyings.join('\n')}
        ${this._attributes.join('\n')}
        ${this._uniforms.join('\n')}
        ${this._shader}`;
    }

    private _varyings: string[] = [];
    private _attributes: string[] = [];
    private _uniforms: string[] = [];

    constructor(private _shader: string) {}

    addVarying(str: string) {
        this._varyings.push(str);
        return this;
    }

    addAttributes(str: string) {
        this._attributes.push(str);
        return this;
    }

    addUniforms(str: string) {
        this._uniforms.push(str);
        return this;
    }

    addTrunkAfter(section: string, glsl: string) {
        this._shader = this._shader.replace(section, `${section}\n${glsl}`);
        return this;
    }

    replaceTrunk(section: string, glsl: string) {
        this._shader = this._shader.replace(section, glsl);
        return this;
    }

    addTrunkBefore(section: string, glsl: string) {
        this._shader = this._shader.replace(section, `${glsl}\n${section}`);
        return this;
    }
}
