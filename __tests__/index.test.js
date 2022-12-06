import { vali4Test } from '../index'
const Joi =  require('@hapi/joi')
describe("validate", () => {

    describe("Valide regex", () => {

        test('Valide regex successfully', () => {
            const swaggerconfig = {
                jscode: {
                    type: 'string',
                    description: '小程序前端获取的JSCODE',
                    required: true,
                    pattern: '[\u4e00-\u9fa5]'
                }
            }
            const param = {
                jscode: '好的'
            }

            expect(() => {
                vali4Test(swaggerconfig, param)
            }).not.toThrowError()

        })

        test('Fail to valide regex', () => {
            const swaggerconfig = {
                jscode: {
                    type: 'string',
                    description: '小程序前端获取的JSCODE',
                    required: true,
                    pattern: '[\u4e00-\u9fa5]'
                }
            }
            const param = {
                jscode: 'fjafalfaf'
            }
            try {
                vali4Test(swaggerconfig, param)
            } catch (e) {
                expect(e.errorCode).toEqual(3001)
            }
        })

        test('Success to valide regex string', () => {
            const swaggerconfig = {
                url: {
                    type: 'string',
                    description: 'url',
                    required: true,
                    pattern: '\\bsinaimg\\b'
                }
            }
            const param = {
                url: 'https://tva1.sinaimg.cn/crop.8.0.451.451.50/xxxxxxp1mc4jj30dw0cj3zz.jpg'
            }
            // const schema = Joi.object({
            //     url: Joi.string().pattern(new RegExp('\\bsinaimg\\b')).required()
            // })
            // console.log(schema.validate(param))
            expect(() => {
                vali4Test(swaggerconfig, param)
            }).not.toThrowError()
        })
    })

    describe("Valide type", () => {

        test('Fai to valide type', () => {
            const swaggerconfig = {
                jscode: {
                    type: 'string',
                    description: '小程序前端获取的JSCODE',
                    required: true,
                }
            }
            const param = {
                jscode: 24234234234
            }
            try {
                vali4Test(swaggerconfig, param)
            } catch (e) {
                expect(e.errorCode).toEqual(3001)
            }
        })

        test('Valide type successfully', () => {
            const swaggerconfig = {
                jscode: {
                    type: 'string',
                    description: '小程序前端获取的JSCODE',
                    required: true,
                }
            }
            const param = {
                jscode: 'sldsdsdf'
            }
            expect(() => {
                vali4Test(swaggerconfig, param)
            }).not.toThrowError()
        })
    })

    describe("Valide empty", () => {
        test('Fai to valide empty', () => {
            const swaggerconfig = {
                jscode: {
                    type: 'string',
                    description: '小程序前端获取的JSCODE',
                }
            }
            const param = {
                jscode: ''
            }
            try {
                vali4Test(swaggerconfig, param)
            } catch (e) {
                expect(e.errorCode).toEqual(3001)
            }
        })

        test('Valide empty successfully', () => {
            const swaggerconfig = {
                jscode: {
                    type: 'string',
                    description: '小程序前端获取的JSCODE',
                    nullable: true,
                }
            }
            const param = {
                jscode: 'sldsdsdf'
            }
            expect(() => {
                vali4Test(swaggerconfig, param)
            }).not.toThrowError()
        })
    })

    describe("Valide requirement", () => {
        test('Fai to valide requirement', () => {
            const swaggerconfig = {
                jscode: {
                    type: 'string',
                    description: '小程序前端获取的JSCODE',
                    required: true
                }
            }
            const param = {
            }
            try {
                vali4Test(swaggerconfig, param)
            } catch (e) {
                expect(e.errorCode).toEqual(3001)
            }
        })

        test('Valide requirement successfully', () => {
            const swaggerconfig = {
                jscode: {
                    type: 'string',
                    description: '小程序前端获取的JSCODE',
                    required: true
                }
            }
            const param = {
                jscode: 'sldsdsdf'
            }
            expect(() => {
                vali4Test(swaggerconfig, param)
            }).not.toThrowError()
        })
    })

    describe("Valide enum", () => {
        test('Fai to valide enum', () => {
            const swaggerconfig = {
                jscode: {
                    type: 'string',
                    description: '小程序前端获取的JSCODE',
                    enum: ["a", "b"]
                }
            }
            const param = {
                jscode: 'c'
            }
            try {
                vali4Test(swaggerconfig, param)
            } catch (e) {
                expect(e.errorCode).toEqual(3001)
            }
        })

        test('Valide enum successfully', () => {
            const swaggerconfig = {
                jscode: {
                    type: 'string',
                    description: '小程序前端获取的JSCODE',
                    enum: ["a", "b"]
                }
            }
            const param = {
                jscode: 'a'
            }
            expect(() => {
                vali4Test(swaggerconfig, param)
            }).not.toThrowError()
        })
    })

})
