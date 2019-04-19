cc.Class({
    extends: cc.Component,


    NoADS() {
        if(cc.sys.OS_ANDROID == cc.sys.os) {

           
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showReward","()V");//展示视频广告
        }
         else if(cc.sys.OS_IOS == cc.sys.os) {
            jsb.reflection.callStaticMethod("AppController", "game2NativeShow");//ios
        }
    }
})