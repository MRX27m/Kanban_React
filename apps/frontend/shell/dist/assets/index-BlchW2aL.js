import { i as importShared } from './_virtual___federation_fn_import-CX_cpf2M.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CyoIsdjr.js';
import { r as reactDomExports } from './index-D9Af7wOI.js';

true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const remotesMap = {
'auth':{url:'http://localhost:3002/assets/remoteEntry.js',format:'esm',from:'vite'},
  'workspace':{url:'http://localhost:3003/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const currentImports = {};
                const loadJS = async (url, fn) => {
                    const resolvedUrl = typeof url === 'function' ? await url() : url;
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.onload = fn;
                    script.src = resolvedUrl;
                    document.getElementsByTagName('head')[0].appendChild(script);
                };

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        if (remoteFrom === 'webpack') {
                            return Object.prototype.toString.call(module).indexOf('Module') > -1 && module.default ? module.default : module
                        }
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    'react':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-BCcI129A.js', import.meta.url).href, remoteFrom), loaded:1}},'react-dom':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-dom-BhMZJInU.js', import.meta.url).href, remoteFrom), loaded:1}},'react-router-dom':{'6.30.4':{get:()=>get(new URL('__federation_shared_react-router-dom-BS7O1leu.js', import.meta.url).href, remoteFrom), loaded:1}},'zustand':{'4.5.7':{get:()=>get(new URL('__federation_shared_zustand-D0V3LbNa.js', import.meta.url).href, remoteFrom), loaded:1}},'@tanstack/react-query':{'5.100.14':{get:()=>get(new URL('__federation_shared_@tanstack/react-query-B384mbpg.js', import.meta.url).href, remoteFrom), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if ('var' === remote.format) {
                            // loading js with script tag
                            return new Promise(resolve => {
                                const callback = () => {
                                    if (!remote.inited) {
                                        remote.lib = window[remoteId];
                                        remote.lib.init(wrapShareModule(remote.from));
                                        remote.inited = true;
                                    }
                                    resolve(remote.lib);
                                };
                                return loadJS(remote.url, callback);
                            });
                        } else if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = typeof remote.url === 'function' ? remote.url : () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule(remote.from);
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_wrapDefault(module, need) {
                    if (!module?.default && need) {
                        let obj = Object.create(null);
                        obj.default = module;
                        obj.__esModule = true;
                        return obj;
                    }
                    return module;
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const {create} = await importShared('zustand');

const getInitialUser = () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if (token && userId && email) return { id: userId, email };
  } catch {
  }
  return null;
};
const useAuthStore = create((set) => ({
  user: getInitialUser(),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    set({ user: null });
    window.dispatchEvent(new CustomEvent("auth:logout"));
  }
}));
if (typeof window !== "undefined") {
  window.addEventListener("auth:login", (e) => {
    const { user } = e.detail;
    useAuthStore.setState({ user });
  });
  window.addEventListener("auth:logout", () => {
    useAuthStore.setState({ user: null });
  });
}

var NavigationEnum = /* @__PURE__ */ ((NavigationEnum2) => {
  NavigationEnum2["root"] = "/";
  NavigationEnum2["login"] = "/login";
  NavigationEnum2["register"] = "/register";
  NavigationEnum2["selectWorkSpace"] = "/SelectWorkpres";
  return NavigationEnum2;
})(NavigationEnum || {});

const {Navigate: Navigate$1} = await importShared('react-router-dom');
const PrivateRoute = ({ children }) => {
  const { user } = useAuthStore();
  return user ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate$1, { to: NavigationEnum.login, replace: true });
};

const {lazy,Suspense,Component} = await importShared('react');

const {BrowserRouter,Navigate,Route,Routes} = await importShared('react-router-dom');
const LoginPage = lazy(() => __federation_method_getRemote("auth" , "./LoginPage").then(module=>__federation_method_wrapDefault(module, true)).then((m) => ({ default: m.LoginPage ?? m.default })));
const RegisterPage = lazy(() => __federation_method_getRemote("auth" , "./RegisterPage").then(module=>__federation_method_wrapDefault(module, true)).then((m) => ({ default: m.RegisterPage ?? m.default })));
const SelectWorkSpace = lazy(() => __federation_method_getRemote("workspace" , "./SelectWorkSpace").then(module=>__federation_method_wrapDefault(module, true)).then((m) => ({ default: m.SelectWorkSpace ?? m.default })));
const WorkSpace = lazy(() => __federation_method_getRemote("workspace" , "./WorkSpace").then(module=>__federation_method_wrapDefault(module, true)).then((m) => ({ default: m.WorkSpace ?? m.default })));
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#fff", padding: 40, textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Сталась помилка" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { opacity: 0.6, marginTop: 12 }, children: this.state.error.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              this.setState({ error: null });
              window.location.reload();
            },
            style: { marginTop: 24, padding: "10px 24px", borderRadius: 20, background: "linear-gradient(42deg,#0b2688,#cc088e)", color: "#fff", border: "none", cursor: "pointer" },
            children: "Перезавантажити"
          }
        )
      ] });
    }
    return this.props.children;
  }
}
const Loader = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "rgba(255,255,255,0.5)", padding: 40, textAlign: "center" }, children: "Завантаження..." });
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: NavigationEnum.root, element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: NavigationEnum.login, replace: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: NavigationEnum.login, element: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: NavigationEnum.register, element: /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: NavigationEnum.selectWorkSpace, element: /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectWorkSpace, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/workpres/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkSpace, {}) }) }) })
  ] }) }) }) });
}

const {QueryClient,QueryClientProvider} = await importShared('@tanstack/react-query');
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 1e3 * 30 } }
});
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
