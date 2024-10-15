import { SaveFile } from './save-file.use-case';
import fs from 'fs';


describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    }
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    afterEach(() => {
        const outputsFolderExists = fs.existsSync('outputs');
        if (outputsFolderExists) fs.rmSync('outputs', { recursive: true });

        const customOutputsFolderExists = fs.existsSync(customOptions.fileDestination);
        if (customOutputsFolderExists) fs.rmSync(customOptions.fileDestination, { recursive: true });
    })

    test('should save file with default values', () => {

        const saveFile = new SaveFile();

        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath); // ojo
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);


    });

    test('Should save file with custom values', () => {
        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe(customOptions.fileContent);
    })

    test('Should return false if directory could not be create', () => {

        const saveFile = new SaveFile();

        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );
        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);

        mkdirSpy.mockRestore()
    })

    test('Should return false if file could not be create', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writint error message from testing') }
        );

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect(result).toBe(false);
        writeFileSpy.mockRestore();
    })
})