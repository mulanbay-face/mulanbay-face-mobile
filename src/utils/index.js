/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

//图片上传将base64转换为文件
export function dataURLtoFile(urlData) {
  //去掉url的头，并转换为byte
  var bytes=window.atob(urlData.split(',')[1]);
  //处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
  }
  return new Blob( [ab] , {type : 'image/png'});
}

//关键字转换为tags标签
export function keywordsToTags(keywords) {
  let tags = new Array();
  if(keywords==null||keywords==''){
    return tags;
  }else{
    const ks = keywords.split(',');
    for (var value of ks) {
      tags.push({"text":value,"tiClasses":["ti-valid"]});
    }
    return tags;
  }
}

//添加tag标签
export function addTag(tag,tags) {
  return tags.push({"text":tag,"tiClasses":["ti-valid"]});
}

//tags标签转换为关键字
export function tagsToKeywords(tags) {
  if(tags==null||tags.length==0){
    return null;
  }else{
    let ks = new Array();
    for (var value of tags) {
      ks.push(value.text);
    }
    return ks.join(',');
  }
}

// 字符加上金钱前缀
export function formatMoney(pp) {
  if (pp == null) {
    return '';
  }
  return '￥' + pp.toFixed(2);
}

//计算百分比
export function getPercent(num1,num2) {
	if(num2==0){
		return 'n/a';
	}
  return (Math.round(num1 / num2 * 10000) / 100.00);
}

//默认匹配的比例
export const defaultRate = 50
