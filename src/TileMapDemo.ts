class TileMapDemo extends eui.Component {

    private tileGrp: eui.Group;
    private scroller: eui.Scroller;
    private role: eui.Image;

    private row: number;
    private col: number;

    public constructor() {
        super();
        this.skinName = "TileMapDemoSkin";
        this.row = 16;
        this.col = 10;
    }

    private gridWidth: number;
    private gridHeight: number;

    private curX: number;
    private curY: number;

    protected createChildren(): void {
        super.createChildren();
        let stageW: number = this.stage.stageWidth;
        let stageH: number = this.stage.stageHeight;
        this.gridWidth = stageW / this.col;
        this.gridHeight = stageH / this.row;
        for (let i=0; i<=this.row+1; i++) {
            for (let j=0; j<=this.col+1; j++) {
                let rect: eui.Rect = new eui.Rect(this.gridWidth,this.gridHeight);
                if (i%2 == 0) {
                    rect.fillColor = j%2==0 ? 0x0079FF : 0x9ECBFC;
                }
                else {
                    rect.fillColor = j%2==1 ? 0x0079FF : 0x9ECBFC;
                }
                rect.x = this.gridWidth * j;
                rect.y = this.gridHeight * i;
                this.tileGrp.addChild(rect);
            }
        }
        this.tileGrp.scrollH = this.gridWidth;
        this.tileGrp.scrollV = this.gridHeight;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.curX = this.role.x + this.tileGrp.scrollH;
        this.curY = this.role.y + this.tileGrp.scrollV;
    }

    $onAddToStage(stage, nest) {
        super.$onAddToStage(stage,nest);
        this.scroller.addEventListener(eui.ScrollerThrowEvent.CHANGE, this.onScrollChange, this);
    }

    $onRemoveFromStage() {
        super.$onRemoveFromStage();
        this.scroller.removeEventListener(eui.ScrollerThrowEvent.CHANGE, this.onScrollChange, this);
    }

    private onScrollChange(): void {
        if (this.tileGrp.scrollH >= this.gridWidth*2) {
            for (let i=0; i<=this.row+1; i++) {
                let rect: eui.Rect = <eui.Rect>this.tileGrp.getChildAt(i*(this.col+2));
                this.tileGrp.setChildIndex(rect, i * (this.col+2) + (this.col+1));
                for (let j=0; j<=this.col; j++) {
                    let rect: eui.Rect = <eui.Rect>this.tileGrp.getChildAt(i*(this.col+2)+j);
                    rect.x -= this.gridWidth;
                }
                rect.x = (this.col+1) * this.gridWidth;
            }        
            this.tileGrp.scrollH = this.gridWidth;
            this.curX -= this.gridWidth;
        }
        else if(this.tileGrp.scrollH <= 0) {
            for (let i=0; i<=this.row+1; i++) {
                let rect: eui.Rect = <eui.Rect>this.tileGrp.getChildAt(i * (this.col+2) + (this.col+1));
                this.tileGrp.setChildIndex(rect, i * (this.col+2));
                for (let j=1; j<=this.col+1; j++) {
                    let rect: eui.Rect = <eui.Rect>this.tileGrp.getChildAt(i*(this.col+2)+j);
                    rect.x += this.gridWidth;
                }
                rect.x = 0;
            }
            this.tileGrp.scrollH = this.gridWidth;
            this.curX += this.gridWidth;
        }
        this.role.x = this.curX - this.tileGrp.scrollH;

        if (this.tileGrp.scrollV >= this.gridHeight*2) {
            for(let i=0; i<=this.col+1; i++) {
                for (let j=0; j<=this.row; j++) {
                    let rect: eui.Rect = <eui.Rect>this.tileGrp.getChildAt(j * (this.col+2) + i);
                    let rec: eui.Rect = <eui.Rect>this.tileGrp.getChildAt((j+1) * (this.col+2) + i);
                    this.tileGrp.swapChildren(rect,rec);
                    rec.y -= this.gridHeight;
                    rect.y += this.gridHeight;
                }
            }     
            this.tileGrp.scrollV = this.gridHeight;
            this.curY -= this.gridHeight;
        }
        else if(this.tileGrp.scrollV <= 0) {
            for(let i=0; i<=this.col+1; i++) {
                for (let j=this.row+1; j>0; j--) {
                    let rect: eui.Rect = <eui.Rect>this.tileGrp.getChildAt(j * (this.col+2) + i);
                    let rec: eui.Rect = <eui.Rect>this.tileGrp.getChildAt((j-1) * (this.col+2) + i);
                    this.tileGrp.swapChildren(rect,rec);
                    rec.y += this.gridHeight;
                    rect.y -= this.gridHeight;
                }
            }     
            this.tileGrp.scrollV = this.gridHeight;
            this.curY += this.gridHeight;
        }
        this.role.y = this.curY - this.tileGrp.scrollV;
    }
}