import { ShaderUtils } from './glslUtils';

/**
 *   将模型x,z在作用域范围内的点的y值拟合到函数external_expression的位置
 *
 * @export
 * @param {string} vertexShader
 * @param {string} external_expression 需要用符合glsl语法规则的函数  eg: external_expression= `
    vec3 f( in vec3 position){
        if(pow(position.x,2.0f)+pow(position.y,2.0f)+pow(position.z,2.0f)<=pow(40.0,2.0f)){
            return vec3(position.x,sqrt(pow(40.0,2.0f)-pow(position.x,2.0f)-pow(position.z,2.0f)),position.z);
        }
        return position;		
				}
    `
 * @param {number[]} external_condition 可选参数 定义域表达式 eg: `
    bool g(in vec3 position){
        if(position.x>10.0){
            return true;
        }else{
            return false;
        };
        
    }
    `

 * @return {*}
 */
export function fittingVertex(vertexShader: string, external_expression: string, external_condition: string) {
    if (external_condition) {
        // 宏定义函数表达式
        const macroDefinition = `
        #define USE_EXTERNAL_CONDITION;
    `;
        vertexShader = macroDefinition + vertexShader;
    } else {
        // 没有传值的时候undefined，addVarying会有问题
        external_condition = '';
    }

    const vUtils = new ShaderUtils(vertexShader)
        .addVarying(`${external_expression}${external_condition}`)
        .addTrunkAfter(
            '#include <worldpos_vertex>',
            `
            #ifdef USE_EXTERNAL_CONDITION

            if (g(position)){
                gl_Position = projectionMatrix * modelViewMatrix * vec4(f(position),1.0);
            }
          

            #else
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(f(position),1.0);

            #endif

            `,
        );

    return vUtils.glsl;
}
