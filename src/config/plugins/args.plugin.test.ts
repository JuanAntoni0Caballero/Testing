

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args]

    const { yarg } = await import('./args.plugin')

    return yarg
}

describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv

    beforeEach(() => {
        process.argv = originalArgv
        jest.resetModules()
    })

    test('Should return default values', async () => {

        const argv = await runCommand(['-b', '5'])

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }))
    })


    test('Should return confuguration with custom values', async () => {

        const options = {
            b: 5,
            l: 10,
            n: 'custom-name',
            d: 'custom-directory'
        }

        const argv = await runCommand([
            '-b', `${options.b}`,
            '-l', `${options.l}`,
            '-n', `${options.n}`,
            '-d', `${options.d}`
        ])

        expect(argv).toEqual(expect.objectContaining(options))
    })
})

