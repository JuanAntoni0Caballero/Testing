import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';


describe('Server App', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-filename'
    }

    test('Should create ServerApp instance', () => {

        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function')
    })


    test('Should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
        const saveFile = jest.spyOn(SaveFile.prototype, 'execute')

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenCalledWith('File created!');
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });

        expect(saveFile).toHaveBeenCalledTimes(1)
        expect(saveFile).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        })
    })

    test('Should run with custom value mocked', () => {

        const logMock = jest.fn()
        const logErrorMock = jest.fn()
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2')
        const saveFileMock = jest.fn().mockReturnValue(true)

        console.log = logMock;
        console.error = logErrorMock
        CreateTable.prototype.execute = createMock
        SaveFile.prototype.execute = saveFileMock

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        })
        expect(logMock).toHaveBeenCalledWith('File created!')
        // expect(logErrorMock).not.toHaveBeenCalledWith()
    })
})