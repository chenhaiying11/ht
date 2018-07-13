//请求接口地址部分

// var titleUrl = "http://192.168.18.194:3800/manage/api/hosts";
// $.ajax({
//         url:titleUrl,
//         type: "get",    //get传送方式
//         async: true, //是否异步 
//         dataType: "json", //设置返回数据类型 json
//         //成功执行
//         success: function(data){
//             console.log(data);
//         },
//         //失败执行
//         error: function(error){
            
//         },
//         //不论成功失败执行
//         complete: function(xhr){
            
//         }
//     });

//查看访问记录的数据
var a = {"code":0,"data":[{"Id":1,"HostName":"localhost:3000"}],"msg":"success"};

data(a);
function data(a){
	// console.log(a);
    var id = a.data[0].Id;
    var name = a.data[0].HostName;
    // console.log(id);
    // console.log(name);
    $(".op").html(name);
};

//网址、标题、总访问量的数据
var record= {"code":0,"data":[{"Id":1,"Host":"localhost:3000","Url":"http://localhost:3000/manage","Title":"http://localhost:3000/manage","TotalCount":14},{"Id":3,"Host":"localhost:3000","Url":"http://localhost:3000/test2","Title":"Test Html","TotalCount":7},{"Id":2,"Host":"localhost:3000","Url":"http://localhost:3000/test","Title":"Test Html","TotalCount":6}],"msg":"success"};
 
Access_record(record);
function Access_record(record){
	var list = baidu.template("ListTmp",record);
 	$("#tbody").html(list);
	console.log(record);
}

//点击查看访问记录
$(".btn-fw").click(function(){
  $("table").show();
})
//点击查看统计图出现的页面
$(".btn-warning").click(function(){
	$(".modal").css("display","block");
})

//点击关闭页面隐藏模态框

$(".close").click(function(){
	$(".modal").css("display","none");
})

//点击查询的时候图标显示
$(".btn-cx").click(function(){
    $("#record_chart").css("display","block");
})

//统计图的数据
var statistics_list= {"code":0,"data":[{"Id":1,"Url":"http://localhost:3000/manage","Date":"2018-07-04","TimeStamp":1530680858,"Count":4},{"Id":4,"Url":"http://localhost:3000/manage","Date":"2018-07-06","TimeStamp":1530855364,"Count":10}],"msg":"success"};


tb(statistics_list);
function tb (statistics_list){
	console.log(statistics_list);
	var y = baidu.template("ListTmp_1",statistics_list);
 	$("#date_selected").html(y);
 	// console.log(y);
}

var time_list=[];
var Count_list=[];
for(var x = 0;x<statistics_list.data.length;x++){
    console.log(statistics_list.data[x].Date);
    console.log(statistics_list.data[x].Count);
    time_list.push(statistics_list.data[x].Date);
    Count_list.push(statistics_list.data[x].Count)
}
if ($(window).width() < 768) {
    $("#record_chart").css("width", ($("#detailModal").width() - 60) + "px")
  }

//基于准备好的dome容器，初始化echarts实例
var chart = echarts.init(document.getElementById('record_chart'));
var option = {
	xAxis : [{
          type : 'category',
          data : time_list,
          splitLine: {
              show: false
          },
    }],
  	yAxis : [{
      	type : 'value',
      	name : '访问量',
  	}],
  	//系列列表。每个系列通过 type 决定自己的图表类型
    series : [{
        name:'访问量',
        type:'line',//折线
        symbolSize: 8,//线上圆点的大小
        lineStyle: {
            normal: {
                opacity: 1
            }
        },
        data: Count_list
    }]
}
chart.setOption(option);

window.onresize = () => {
    if ($(window).width() < 768) {
        $("#record_chart").css("width", ($("#detailModal").width() - 60) + "px")
    } else {
        $("#record_chart").css("width", "560px")
    }
    chart.resize();
}
  

