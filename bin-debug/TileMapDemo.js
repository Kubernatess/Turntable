var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TileMapDemo = (function (_super) {
    __extends(TileMapDemo, _super);
    function TileMapDemo() {
        var _this = _super.call(this) || this;
        _this.skinName = "TileMapDemoSkin";
        _this.row = 16;
        _this.col = 10;
        return _this;
    }
    TileMapDemo.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.gridWidth = stageW / this.col;
        this.gridHeight = stageH / this.row;
        for (var i = 0; i <= this.row + 1; i++) {
            for (var j = 0; j <= this.col + 1; j++) {
                var rect = new eui.Rect(this.gridWidth, this.gridHeight);
                if (i % 2 == 0) {
                    rect.fillColor = j % 2 == 0 ? 0x0079FF : 0x9ECBFC;
                }
                else {
                    rect.fillColor = j % 2 == 1 ? 0x0079FF : 0x9ECBFC;
                }
                rect.x = this.gridWidth * j;
                rect.y = this.gridHeight * i;
                this.tileGrp.addChild(rect);
            }
        }
        this.tileGrp.scrollH = this.gridWidth;
        this.tileGrp.scrollV = this.gridHeight;
    };
    TileMapDemo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.curX = this.role.x + this.tileGrp.scrollH;
        this.curY = this.role.y + this.tileGrp.scrollV;
    };
    TileMapDemo.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.scroller.addEventListener(eui.ScrollerThrowEvent.CHANGE, this.onScrollChange, this);
    };
    TileMapDemo.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.scroller.removeEventListener(eui.ScrollerThrowEvent.CHANGE, this.onScrollChange, this);
    };
    TileMapDemo.prototype.onScrollChange = function () {
        if (this.tileGrp.scrollH >= this.gridWidth * 2) {
            for (var i = 0; i <= this.row + 1; i++) {
                var rect = this.tileGrp.getChildAt(i * (this.col + 2));
                this.tileGrp.setChildIndex(rect, i * (this.col + 2) + (this.col + 1));
                for (var j = 0; j <= this.col; j++) {
                    var rect_1 = this.tileGrp.getChildAt(i * (this.col + 2) + j);
                    rect_1.x -= this.gridWidth;
                }
                rect.x = (this.col + 1) * this.gridWidth;
            }
            this.tileGrp.scrollH = this.gridWidth;
            this.curX -= this.gridWidth;
        }
        else if (this.tileGrp.scrollH <= 0) {
            for (var i = 0; i <= this.row + 1; i++) {
                var rect = this.tileGrp.getChildAt(i * (this.col + 2) + (this.col + 1));
                this.tileGrp.setChildIndex(rect, i * (this.col + 2));
                for (var j = 1; j <= this.col + 1; j++) {
                    var rect_2 = this.tileGrp.getChildAt(i * (this.col + 2) + j);
                    rect_2.x += this.gridWidth;
                }
                rect.x = 0;
            }
            this.tileGrp.scrollH = this.gridWidth;
            this.curX += this.gridWidth;
        }
        this.role.x = this.curX - this.tileGrp.scrollH;
        if (this.tileGrp.scrollV >= this.gridHeight * 2) {
            for (var i = 0; i <= this.col + 1; i++) {
                for (var j = 0; j <= this.row; j++) {
                    var rect = this.tileGrp.getChildAt(j * (this.col + 2) + i);
                    var rec = this.tileGrp.getChildAt((j + 1) * (this.col + 2) + i);
                    this.tileGrp.swapChildren(rect, rec);
                    rec.y -= this.gridHeight;
                    rect.y += this.gridHeight;
                }
            }
            this.tileGrp.scrollV = this.gridHeight;
            this.curY -= this.gridHeight;
        }
        else if (this.tileGrp.scrollV <= 0) {
            for (var i = 0; i <= this.col + 1; i++) {
                for (var j = this.row + 1; j > 0; j--) {
                    var rect = this.tileGrp.getChildAt(j * (this.col + 2) + i);
                    var rec = this.tileGrp.getChildAt((j - 1) * (this.col + 2) + i);
                    this.tileGrp.swapChildren(rect, rec);
                    rec.y += this.gridHeight;
                    rect.y -= this.gridHeight;
                }
            }
            this.tileGrp.scrollV = this.gridHeight;
            this.curY += this.gridHeight;
        }
        this.role.y = this.curY - this.tileGrp.scrollV;
    };
    return TileMapDemo;
}(eui.Component));
__reflect(TileMapDemo.prototype, "TileMapDemo");
