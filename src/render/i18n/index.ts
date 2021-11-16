//index.ts
import { createI18n } from "vue-i18n"; //引入vue-i18n组件
//引入同级目录下文件
const modules = import.meta.globEager("./*");

const viewModules = import.meta.globEager(
  "./locales/[[:lower:]][[:lower:]]-[[:upper:]][[:upper:]].ts"
);

function getLangAll(): any {
  const message: any = {};
  getLangFiles(modules, message);
  getLangFiles(viewModules, message);
  return message;
}
/**
 * 获取所有语言文件
 * @param {Object} mList
 */
function getLangFiles(mList: any, msg: any) {
  for (const path in mList) {
    if (mList[path].default) {
      //  获取文件名
      const pathName = path.substr(path.lastIndexOf("/") + 1, 5);

      if (msg[pathName]) {
        msg[pathName] = {
          ...mList[pathName],
          ...mList[path].default,
        };
      } else {
        msg[pathName] = mList[path].default;
      }
    }
  }
}

//注册i8n实例并引入语言文件
const i18n = createI18n({
  globalInjection: true,
  locale: "zh-CN",
  messages: getLangAll(),
});

export default i18n; //将i18n暴露出去，在main.js中引入挂载
