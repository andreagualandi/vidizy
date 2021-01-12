const { ipcRenderer } = window;

async function call(endpoint, action, data = {}) {
    try {
        return await ipcRenderer.invoke(endpoint, { action, data });
    } catch (e) {
        console.error('Api call failed', e);
        return null;
    }
}

const ydl = {
    getInfo: (url) => call('api-ydl', 'getInfo', { url }),
    getUrl: (url, format) => call('api-ydl', 'getUrl', { url, format }),
}

const ffmpeg = {
    getVersion: () => call('api-ffmpeg', 'getVersion'),
    cut: (args) => call('api-ffmpeg', 'cut', args),
}

const app = {
    getDownloadPath: (fileName) => call('api-app', 'getDownloadPath', { fileName }),
}

export { ydl, ffmpeg, app };