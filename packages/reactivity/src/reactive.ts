import { isObject } from "@vue/shared";
import { mutableHandlers, ReactiveFlags } from "./baseHandler";

// 用来存储代理后的结果，避免重复代理
const reactiveMap = new WeakMap()

function createReactiveObject(target: Object) {
    // 判断类型
    if(!isObject(target)){
        return target
    }

    // 判断 target 有没有被代理过
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }

    // 判断有没有缓存 
    if(reactiveMap.has(target)) {
        return reactiveMap.get(target)
    }

    let proxy = new Proxy(target, mutableHandlers)
    reactiveMap.set(target, proxy)
    return proxy
}

export function reactive(target: Object) {
    return createReactiveObject(target)
}