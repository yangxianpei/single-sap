import * as singleSpa from 'single-spa'
const runScript = async (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
};
// async function getSource(url,target){
//     let {data}= await axios.get(url)
//     let {publicPath,entrypoints}=data
//     let arr =entrypoints[target].assets
//     arr.forEach(url =>{
//          runScript(publicPath+url)
//     })
// }

singleSpa.registerApplication( //注册微前端服务
    'vue-child', 
    async () => {
        await runScript('http://127.0.0.1:3000/js/chunk-vendors.js');
        await runScript('http://127.0.0.1:3000/js/app.js');
        // let singleVue=await getSource('http://127.0.0.1:3000/stats.json','app')
        // window.singleVue=singleVue
        return window.singleVue;
    },
    location => location.pathname.startsWith('/vue') // 配置微前端模块前缀
);

singleSpa.registerApplication( //注册微前端服务
    'react-app', 
    async () => {
        await runScript('http://localhost:3001/static/js/bundle.js');
        await runScript('http://localhost:3001/static/js/main.chunk.js');
        await runScript('http://localhost:3001/static/js/0.chunk.js');
    
        return window.reactApp;
    },
    location => location.pathname.startsWith('/react') // 配置微前端模块前缀
);
singleSpa.start(); // 启动