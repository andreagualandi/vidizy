import React from 'react'
import './about.less';

export default function About() {
    window.ipcRenderer.invoke('api', {}).then((result) => {
        console.log('Message from back', result);
    })

    return (
        <div className="about-content">
            About
        </div>
    );
}