interface Type {
    description?: string
    accept: Record<string, string | string[]>
}

interface FilePickerOptions {
    types?: Type[]
    excludeAcceptAllOption?: boolean
}

interface FileSystemHandle {
    kind: 'file' | 'directory'
    name: string
    isSameEntry: (handle: FileSystemHandle) => Promise<boolean>
}

interface ShowOpenFilePickerOptions extends FilePickerOptions {
    multiple?: boolean
}

export { FileSystemHandle, ShowOpenFilePickerOptions }

declare global {
    interface Window {
        showOpenFilePicker: (
            options?: ShowOpenFilePickerOptions
        ) => Promise<FileSystemHandle[]>
    }
}
