require('./bootstrap');
window.Vue = require('vue');

let module_name = document.querySelector('meta[name="source"]').content;

if (module_name !== '') {
    import(`./src/${module_name}`)
        .then(module => {
            new Vue(module.default).$mount('#app');
        })
        .catch(error =>{
            console.log(error);
            alert('Module not found');
        });
}