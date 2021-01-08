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
}

export { ydl };