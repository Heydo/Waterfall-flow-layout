window.onload = function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":"1.jpg"},
                        {"src":"2.jpg"},
                        {"src":"3.jpg"},
                        {"src":"4.jpg"}]
                };

	window.onscroll = function(){	//根据最后一张图片的位置来判断是否需要加载
		if(chackScrollSlide){
			var oParent = document.getElementById('main');
			//将数据块渲染到页面尾部
			for(var i = 0; i < dataInt.data.length-1; i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);

				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);

				var oImg = document.createElement('img');
				oImg.src = "images/"+ dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
	

}

function waterfall(parent, box){
	//将main下的所有class为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	//console.log(oBoxs.length);   23
	//计算整个页面显示的列数(页面宽/box宽)
	var oBoxW = oBoxs[0].offsetWidth;
	//console.log(oBoxW);     202=图片165 +内边距10*2 + 边框 1*2 + 填充15
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//console.log(cols);
	//设置main的宽,固定宽度（列数）
	oParent.style.cssText = 'width :'+ oBoxW*cols + 'px; margin:0 auto;';
	//图片的排列方式，第七张要放到第一行那张图片最短，就放到那张图片下面
	var hArr = [];
	for (var i = 0; i < oBoxs.length; i++) {
		if(i < cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null, hArr);
			//console.log(minH);   150
			var index = getMinhIndex(hArr, minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH +'px';
			//方法一
			//oBoxs[i].style.left = oBoxW*index + 'px';
			//方法二
			oBoxs[i].style.left = oBoxs[index].offsetLeft +'px';
			//更新数组
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
	//console.log(hArr);
	
}
//根据class获取元素
function getByClass(parent, clsName){
	var boxArr = new Array(); //用来存储所有class为box的元素
	var oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++){
		if(oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

function getMinhIndex(arr , val) {
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
}

//检测是否具有加载数据块的条件
function chackScrollSlide() {
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetaTop + Math.floor(oBoxs[oBoxs.length-1]/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//标准模式和混杂模式
	//console.log(scrollTop);
	var height = document.body.clientHeight || document.documentElement.clientHeight;//标准模式和混杂模式
	//console.log(height);
	return (lastBoxH < scrollTop+height) ? true : false;
}