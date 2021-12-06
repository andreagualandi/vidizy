let progressCallback;

window.onmessage = (event) => {
    console.log('evento renderer', event);
    // event.source === window means the message is coming from the preload
    // script, as opposed to from an <iframe> or other source.
    if (event.source === window && event.data === 'main-world-port') {
        const [port] = event.ports
        // Once we have the port, we can communicate directly with the main
        // process.
        port.onmessage = (event) => {
            console.log('from main process:', event.data);
            progressCallback(event.data);
            //port.postMessage(event.data * 2)
        }
        port.onclose = () => {
            console.log('stream ended')
        }
    }
}

async function call(endpoint, action, data = {}) {
    try {
        return await window.api.invoke(endpoint, { action, data });
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
    stop: () => call('api-ffmpeg', 'stop'),
    setProgressCallback: (callback) => { progressCallback = callback }
}

const app = {
    getDownloadPath: (fileName) => call('api-app', 'getDownloadPath', { fileName }),
    showSaveDialog: () => call('api-app', 'showSaveDialog'),
}

export { ydl, ffmpeg, app };