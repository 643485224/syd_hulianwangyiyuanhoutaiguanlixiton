<template>
	<div>
		<div class="chooseDate">
			<h4 style="width: 200px;float: left;" class="left w200">统计数据</h4>
			<p class="right freshen">刷新
				<Icon type="md-refresh" />
			</p>
			<DatePicker type="daterange" :start-date="new Date()" placement="bottom-end" placeholder="Select date"
				style="width: 200px;float: right;" class="right w200" />
			<ul class="right w346">
				<li v-for="(dateListItem, index) in dateList" :key="index" :class="[dateListItem.active?'active':'']" @click="chageData(dateListItem.day)">{{ dateListItem.title }}</li>
			</ul>
		</div>
		<Row :gutter="16" class="shange">
			<Col span="12">
			<div style="background: linear-gradient(to right, #FFB6C9, #FA5252);">col-6</div>
			</Col>
			<Col span="6">
			<div style="background: linear-gradient(to left, #4AA0F0, #5F82FF);">col-6</div>
			</Col>
			<Col span="6">
			<div style="background: linear-gradient(to right, #EAB736, #F5691B);">col-6</div>
			</Col>
		</Row>
		<Row :gutter="16" class="shange">
			<Col span="6">
			<div style="background: linear-gradient(to right, #859FFD, #8E44F4);">col-6</div>
			</Col>
			<Col span="6">
			<div style="background: linear-gradient(to right, #26BAE9, #0F92DC);">col-6</div>
			</Col>
			<Col span="6">
			<div style="background: linear-gradient(to left, #FBC332, #FF8C4B);">col-6</div>
			</Col>
			<Col span="6">
			<div style="background: linear-gradient(to right, #14DAB6, #0FC562);">col-6</div>
			</Col>
		</Row>
		<Row :gutter="16" class="zxt">
			<Col span="12">
			<h3>近七日充值趋势</h3>
			<div>
				<v-chart class="chart" :option="optionLine01" />
			</div>
			</Col>
			<Col span="12">
			<h3>近七日充值趋势</h3>
			<div>
				<v-chart class="chart" :option="optionLine02" />
			</div>
			</Col>
		</Row>
		<Row :gutter="16" class="zxt">
			<Col span="12">
			<h3>近七日充值趋势</h3>
			<div>
				<v-chart class="chart" :option="option" />
			</div>
			</Col>
			<Col span="12">
			<h3>近七日充值趋势</h3>
			<div>
				<v-chart class="chart" :option="option" />
			</div>
			</Col>
		</Row>
		<div>

		</div>
	</div>
</template>
<script>
require("echarts/lib/component/legend");
import * as echarts from "echarts";
import { GetCurrentTime } from "./common.js"
export default {
	data() {
		return {
			option: {
				textStyle: {
					fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
				},

				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)",
				},
				legend: {
					orient: "vertical",
					left: "left",
					data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
				},
				series: [
					{
						name: "Traffic Sources",
						type: "pie",
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						center: ["50%", "60%"],
						data: [
							{ value: 335, name: "Direct" },
							{ value: 310, name: "Email" },
							{ value: 234, name: "Ad Networks" },
							{ value: 135, name: "Video Ads" },
							{ value: 1548, name: "Search Engines" },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
			},

			optionLine01: {
				title: {
					subtext: "单位：元", // 副标题
					subtextStyle: {
						// 副标题样式
						color: "#808080",
						fontSize: 12,
					},
				},
				tooltip: {
					trigger: "axis",
					formatter: "充值金额： {c}元",
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					//坐标轴颜色
					axisLine: {
						lineStyle: {
							color: "#BBBBBB",
						},
					},
					data: ["07/19", "07/20", "07/21", "07/22", "07/23", "07/24", "07/25"],
				},
				yAxis: {
					show: true,

					type: "value",
					// max : 9000,
					min: 0,
					//默认以千分位显示，不想用的可以在这加一段
					axisLabel: {
						//调整左侧Y轴刻度， 直接按对应数据显示
						show: true,
						showMinLabel: true,
						showMaxLabel: true,
						formatter: function (value) {
							return value;
						},
					},
					splitLine: { show: false },
					axisLine: {
						lineStyle: {
							color: "#BBBBBB",
							width: 1, //这里是为了突出显示加上的
						},
					},
				},
				series: [
					{
						data: [3100, 4700, 3200, 3000, 3000, 3000, 3000],
						type: "line",
						symbol: "none", //折线点是否显示
						itemStyle: {
							normal: {
								color: "#F77681", //折线点的颜色
								lineStyle: {
									color: "#F77681", //折线的颜色
								},
							},
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "rgba(247,118,129,0.7000)" },
									{ offset: 0.5, color: "pink" },
									{ offset: 1, color: "rgba(247,118,129,0)" },
								]),
							},
						},
					},
				],
			},
			optionLine02: {
				title: {
					subtext: "单位：元", // 副标题
					top: 2, // 定位
					left: 150, // 定位
					subtextStyle: {
						// 副标题样式
						color: "#808080",
						fontSize: 12,
					},
				},
				tooltip: {
					trigger: "axis",
					formatter: "充值金额： {c}元",
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					//坐标轴颜色
					axisLine: {
						lineStyle: {
							color: "#BBBBBB",
						},
					},
					data: ["07/19", "07/20", "07/21", "07/22", "07/23", "07/24", "07/25"],
				},
				yAxis: {
					show: true,

					type: "value",
					// max : 9000,
					min: 0,
					//默认以千分位显示，不想用的可以在这加一段
					axisLabel: {
						//调整左侧Y轴刻度， 直接按对应数据显示
						show: true,
						showMinLabel: true,
						showMaxLabel: true,
						formatter: function (value) {
							return value;
						},
					},
					splitLine: { show: false },
					axisLine: {
						lineStyle: {
							color: "#BBBBBB",
						},
					},
				},
				series: [
					{
						data: [3100, 4700, 3200, 3000, 3000, 3000, 3000],
						type: "line",
						symbol: "none", //折线点是否显示
						itemStyle: {
							normal: {
								color: "#4AA0F0", //折线点的颜色
								lineStyle: {
									color: "#4AA0F0", //折线的颜色
								},
							},
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "rgba(74,160,240,0.700)" },
									{ offset: 0.5, color: "#4AA0F0" },
									{ offset: 1, color: "rgba(74,160,240,0)" },
								]),
							},
						},
					},
				],
			},
			optionLineText: {},
			dateList: [
				{
					title: '昨天',
					day: 1,
					active: false,
				}, {
					title: '近7天',
					day: 7,
					active: true,
				}, {
					title: '近30天',
					day: 30,
					active: false,
				}, {
					title: '近一年',
					day: 1,
					active: false,
				}
			],
		};
	},
	methods:{
		chageData(day){

		}
	}
};
</script>

<style scoped>
.chart {
	height: 450px;
}

.ivu-row {
	margin-bottom: 20px;
}

.shange div {
	height: 168px;
	border-radius: 10px;
}

.zxt {
	height: 450px;
}

h3 {
	border-bottom: solid 1px #F5F5F7;
	line-height: 50px;
}

.chooseDate {
	height: 50px;
	border-bottom: solid 1px #F5F5F7;
	margin-bottom: 20px;
}

h4 {
	line-height: 40px;
}

.W200 {
	width: 200px;
}

.w346 {
	width: 280px;
	display: flex;
	justify-content: space-between;
	list-style: none;
	line-height: 32px;
	margin-right: 20px;
}

.w346 li {
	width: 70px;
	text-align: center;
	border: solid 1px #ECECEC;
	color: #666666;
}

.freshen {
	line-height: 32px;
	margin: 0 20px;
	color: #4061EC;
}

.left {
	float: left;
}

.right {
	float: right;
}

.w346 .active {
	background: #4061EC;
	color: #FFFFFF;
}
</style>
