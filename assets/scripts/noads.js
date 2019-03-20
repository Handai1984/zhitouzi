cc.Class({
    extends: cc.Component,


    NoADS() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showReward","()V");//展示视频广告
    }
})