cc.Class({
    extends: cc.Component,

    properties: {
        mask_node: cc.Node,
        gameover_node: cc.Node,
        cow_num_lab: cc.Label,
        cow_str_lab: cc.Label,
    },

    start() {
        this.pos_nodes = this.node.children;
        this.nums = [];
        for (var i = 0; i < this.pos_nodes.length; i++) {
            this.pos_nodes[i].scale = cc.p(1.8, 1.8);

            cc.log('hahahha');
        }

    },

    touzi_move(event) {
        var node = event.target;
        var touzirnd = node.getComponent('touzirnd');
        var old_pos = touzirnd.Pos();//骰子初始位置
        var ismove = touzirnd.ismove;//骰子是否移动
        var touzicount = touzirnd.count;//骰子移动记号

        cc.log(old_pos);
        var count = 0;//pos初始位置为0
        /* 思路，在骰子上添加button按钮，点击骰子，获取骰子的位置和脚本，骰子脚本里面添加2公共变量
        1.ismove 针对移动过的骰子
        2.count 初始值需大于骰子总数
        对pos的子节点进行循环，如果子节点是激活状态并且ismove = false，那就移动到子节点位置
       
        如果子节点是关闭状态并且记号相同，移动到骰子初始位置
*/
        for (var i = 0; i < this.pos_nodes.length; i++) {
            var pos = cc.p(this.pos_nodes[count].x, this.pos_nodes[count].y);
            if (this.pos_nodes[count].active && ismove == false) {
                var act1 = cc.moveTo(1, cc.p(pos.x, pos.y));
                var act2 = cc.scaleTo(1, 1.8);
                var spaw = cc.spawn(act1, act2);
                var call = cc.callFunc(function () {
                    touzirnd.notouch(true);//移动的时候不可点击
                }, this);
                var seq = cc.sequence(spaw, call);
                node.runAction(seq);
                this.pos_nodes[count].active = false;
                touzirnd.notouch(false);
                touzirnd.count = count;//记号标记
                touzirnd.ismove = true;//移动判定
                this.nums[count] = touzirnd.Score();
                cc.log(this.nums);
                return;
            } else if (count == touzicount) {
                var act1 = cc.moveTo(1, cc.p(old_pos.x, old_pos.y));
                var call = cc.callFunc(function () {
                    touzirnd.notouch(true);
                }, this);
                var seq = cc.sequence(act1, call);
                node.runAction(seq);
                touzirnd.notouch(false);
                this.pos_nodes[count].active = true;
                touzirnd.ismove = false;
                touzirnd.count = 10;
                return;

            } else {
                count++;//如果都不是，就访问下个节点
            }
        }
    },

    showresult() {
        this.mask_node.active = true;
        var nubers_one = 0;
        var nubers_two = 0;
        for (var i = 0; i < this.nums.length; i++) {
            if (i < 3) {
                nubers_one += this.nums[i];
            } else {
                nubers_two += this.nums[i];
            }
        }

        if (nubers_one == 10) {
            //show result
            nubers_two = nubers_two % 10;
            this.gameover_node.active = true;
            this.cow_num_lab.string = nubers_two + '';
        } else {
            //gameover
            this.gameover_node.active = true;
            this.cow_num_lab.node.active = false;
            this.cow_str_lab.string = 'NO COW!!'
        }
    },

    restart() {
        cc.director.loadScene('cow');
        this.rndShowAD();
    },

    returnMenu() {
        cc.director.loadScene('menu');
    },

    rndShowAD() {
        var rnd = cc.random0To1() * 1 + 1;
        rnd = Math.floor(rnd);
        if (rnd == 1) {
            if (cc.sys.OS_ANDROID == cc.sys.os) {

                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showInter", "()V");
            } else if (cc.sys.OS_IOS == cc.sys.os) {
                jsb.reflection.callStaticMethod("AppController", "game2NativeShow");//ios
            }
        }
    }




})