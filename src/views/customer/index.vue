<template>
  <div id="app">
    <div class="btn">
      <el-button type="primary" @click="addShop">新建</el-button>
      <el-button type="info" @click="handleDownload">导出表格</el-button>
      <el-select v-model="value" clearable placeholder="选择门店">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="valueState" clearable placeholder="选择状态" @change="changeState($event)">
        <el-option
          v-for="item in optionsState"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="请选择拍摄日期" />
      <el-input v-model="tel" placeholder="请输入手机号" clearable style="width:180px;margin-left:50px" />
      <el-input
        v-model="listQuery.name"
        placeholder="请输入客户名称"
        clearable
        style="width:180px"
        @keyup.enter.native="getList"
      />
      <el-button type="primary" @click="getList()">搜索</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="50" />
        <!-- <el-table-column align="center" prop="id" label="ID" width="50" /> -->
        <el-table-column align="center" prop="name" label="名称" width="80" />
        <el-table-column align="center" prop="phone" label="联系电话" width="130" />
        <el-table-column align="center" prop="address" label="家庭住址" width="200" />
        <el-table-column align="center" prop="store" label="门店" />
        <el-table-column align="center" prop="address" label="订单类别" />
        <el-table-column align="center" prop="payment" label="订单金额" />
        <el-table-column align="center" prop="state" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state == '0'" style="color:#67C23A">待确定拍摄日期</span>
            <span v-if="scope.row.state == '1'" style="color:#4B0082">待拍摄</span>
            <span v-if="scope.row.state == '2'" style="color:#f78989">选片中</span>
            <span v-if="scope.row.state == '3'" style="color:#409EFF">设计中</span>
            <span v-if="scope.row.state == '4'" style="color:#006400">制作中</span>
            <!-- <span v-if="scope.row.state == '4'" style="color:#409EFF">制作中</span> -->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="deliveryTime" label="交付日期">
          <template slot-scope="scope">
            <span v-if="scope.row.deliveryTime">{{ scope.row.deliveryTime }}</span>
            <span v-if="!scope.row.deliveryTime">未定</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="550">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-document-copy"
              type="primary"
              @click="getEditData(scope.row)"
            >编辑</el-button>
            <el-button size="mini" icon="el-icon-user" type="danger" @click="delData(scope.row)">删除</el-button>
            <el-button
              size="mini"
              icon="el-icon-user"
              type="danger"
              @click="delData(scope.row)"
            >发送预约单</el-button>
            <el-button
              size="mini"
              icon="el-icon-user"
              type="danger"
              @click="delData(scope.row)"
            >交付提醒</el-button>
            <el-button size="mini" icon="el-icon-user" type="danger" @click="delData(scope.row)">交付</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
    <!-- dialog弹出框 -->
    <el-dialog :title="title1" :visible.sync="dialogFormVisible" width="65%">
      <el-form :model="form" :inline="true">
        <el-form-item label="姓名">
          <!-- <label slot="label">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label> -->
          <label slot="label">姓&emsp;&emsp;名</label>
          <el-input v-model="form.name" placeholder="请输入姓名" style="width:200px" />
        </el-form-item>
        <el-form-item label="预约日期">
          <el-date-picker
            v-model="form.subscribeTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="选择客户顾问">
          <el-select v-model="form.customerConsultant.id" clearable placeholder="请选择">
            <el-option
              v-for="item in customerConsultant1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提成比例">
          <el-input
            v-model="form.customerConsultantCommission"
            placeholder="请输入提成比例"
            style="width:200px"
          />
        </el-form-item>
        <el-form-item label="电话">
          <label slot="label">电&emsp;&emsp;话</label>
          <el-input v-model="form.phone" placeholder="请输入电话" style="width:200px" />
        </el-form-item>
        <el-form-item label="拍摄日期">
          <el-date-picker
            v-model="form.shootTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="请选择摄影师">
          <el-select v-model="form.photographer.id" clearable placeholder="请选择">
            <el-option
              v-for="item in photographer1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提成比例">
          <el-input
            v-model="form.photographerCommission"
            placeholder="请输入提成比例"
            style="width:200px"
          />
        </el-form-item>
        <el-form-item label="住址">
          <label slot="label">住&emsp;&emsp;址</label>
          <el-input v-model="form.address" placeholder="请输入住址" style="width:200px" />
        </el-form-item>
        <el-form-item label="选片日期">
          <el-date-picker
            v-model="form.selectTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="请选择设计师">
          <el-select v-model="form.designer.id" clearable placeholder="请选择">
            <el-option
              v-for="item in designer1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提成比例">
          <el-input v-model="form.designerCommission" placeholder="请输入提成比例" style="width:200px" />
        </el-form-item>
        <el-form-item label="网络通讯">
          <el-input v-model="form.networkService" placeholder="请输入网络通讯" style="width:200px" />
        </el-form-item>
        <el-form-item label="定稿日期">
          <el-date-picker
            v-model="form.finalizeTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="请选择化妆师">
          <el-select v-model="form.dresser.id" clearable placeholder="请选择">
            <el-option v-for="item in dresser1" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="提成比例">
          <el-input v-model="form.dresserCommission" placeholder="请输入提成比例" style="width:200px" />
        </el-form-item>
        <el-form-item label="套系">
          <label slot="label">套&emsp;&emsp;系</label>
          <el-select
            v-model="form.combo.id"
            clearable
            placeholder="请选择"
            @change="changeOrder($event)"
          >
            <el-option
              v-for="item in optionsCombo"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <!-- <el-input v-model="form.combo.id" placeholder="请输入套系" style="width:200px" /> -->
        </el-form-item>
        <el-form-item label="交付日期">
          <el-date-picker
            v-model="form.deliveryTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="请选择助理一">
          <el-select v-model="form.firstAid.id" clearable placeholder="请选择">
            <el-option
              v-for="item in firstAid1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提成比例">
          <el-input v-model="form.firstAidCommission" placeholder="请输入提成比例" style="width:200px" />
        </el-form-item>
        <el-form-item label="金额">
          <label slot="label">金&emsp;&emsp;额</label>
          <el-input v-model="form.payment" placeholder="请输入金额" style="width:200px" />
        </el-form-item>
        <el-form-item label="婚期">
          <label slot="label">婚&emsp;&emsp;期</label>
          <el-date-picker
            v-model="form.weddingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="请选择助理二">
          <el-select v-model="form.secondAid.id" clearable placeholder="请选择">
            <el-option
              v-for="item in secondAid1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提成比例">
          <el-input v-model="form.secondAidCommission" placeholder="请输入提成比例" style="width:200px" />
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-input v-model="form.state" style="width:200px" />
        </el-form-item>-->
        <el-form-item label="制作说明">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            style="width:1095px"
          />
        </el-form-item>
        <el-form-item />
      </el-form>
      <div class="card">
        <!-- 赠送产品 -->
        <el-row>
          <el-col :span="3" class="give">
            <div>赠送产品</div>
          </el-col>
          <el-col :span="7" class="give1">
            <div>相册(尺寸)</div>
            <div>
              <input v-model="form.gift1[0]" type="text">
            </div>
            <div>
              <input v-model="form.gift2[0]" type="text">
            </div>
            <div>
              <input v-model="form.gift3[0]" type="text">
            </div>
          </el-col>
          <el-col :span="7" class="give1">
            <div>放大(尺寸)</div>
            <div>
              <input v-model="form.gift1[1]" type="text">
            </div>
            <div>
              <input v-model="form.gift2[1]" type="text">
            </div>
            <div>
              <input v-model="form.gift3[1]" type="text">
            </div>
          </el-col>
          <el-col :span="7" class="give2">
            <div>其他产品(尺寸)</div>
            <div>
              <input v-model="form.gift1[2]" type="text">
            </div>
            <div>
              <input v-model="form.gift2[2]" type="text">
            </div>
            <div>
              <input v-model="form.gift3[2]" type="text">
            </div>
          </el-col>
        </el-row>
        <!-- 拍摄内容 -->
        <el-row>
          <el-col :span="3" class="content">
            <div>拍摄内容</div>
          </el-col>
          <el-col :span="21" class="content1">
            <div>
              拍摄景点：
              <input v-model="form.shootAddress" type="text">
            </div>
            <!-- <div>拍摄景点：<el-input v-model="form.shootAddress" style="width:300px;height:20px" /></div> -->
            <div>
              拍摄服装：
              <input v-model="form.shootClothing" type="text">
            </div>
            <div>
              我们提供：
              <input v-model="form.include" type="text">
            </div>
          </el-col>
        </el-row>
        <!-- 喜欢风格 -->
        <el-row>
          <el-col :span="3" class="like">
            <div>喜欢风格</div>
          </el-col>
          <el-col :span="21" class="like1">
            <div>
              <span>
                喜欢风格描述：
                <input v-model="form.style" type="text">
              </span>
              <span>
                对拍摄的特殊要求：
                <input v-model="form.special" type="text">
              </span>
              <span>
                有无照片参考：
                <input v-model="form.photo" type="text">
              </span>
            </div>
          </el-col>
        </el-row>
        <!-- 项目 -->
        <el-row>
          <el-col :span="3" class="project">
            <div>项目</div>
            <div>预约定金</div>
            <div>拍摄付款</div>
            <div>其他付款</div>
          </el-col>
          <el-col :span="5" class="project1">
            <div>金额(元)</div>
            <div>9988888888</div>
            <div>8999999999</div>
            <div>9888888888</div>
          </el-col>
          <el-col :span="5" class="project1">
            <div>经手人</div>
            <div>王硕</div>
            <div>2</div>
            <div>3</div>
          </el-col>
          <el-col :span="6" class="project1">
            <div>日期</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </el-col>
          <el-col :span="5" class="project2">
            <div>顾客签名</div>
            <div>迪丽热巴</div>
            <div>杨幂</div>
            <div>刘玉宝</div>
          </el-col>
        </el-row>
        <!-- 注意事项 -->
        <el-row>
          <el-col :span="3" class="careful">
            <div>拍摄前准备及注意事项</div>
          </el-col>
          <el-col :span="21" class="careful1">
            <div>
              <span>拍照前一周，可以开始适当的做一些面部、皮肤的保养，护发剪发烫发最好在拍摄前15天内完成，头发不要做拉直、烫卷，不要嫁接睫毛，颜色最好一致。</span>
              <span>拍摄前一天，心情放松，提早休息，睡前少喝水，以免隔日眼睛浮肿，要有充足的睡眠，如此拍起来更为精神焕发，神采飞扬。新娘应自行修剪指甲，并将胶毛刮干净。</span>
              <span>拍摄当天请勿自行上妆，只需简单润肤即可，不需要带首饰。</span>
              <span>男士拍摄当天勿穿深色内裤，避免穿白色西裤透色，自带黑白袜子个一双，黑皮鞋一双，也可自带一套合身的西装。</span>
              <span>男士如需带眼睛拍摄，应把镜片除去，只保留镜框，以防镜片出现反光现象。</span>
              <span>拍摄当天与化妆师摄影师讲出您喜欢的拍摄效果和风格，并可以带些电子版的参考图片。</span>
              <span>拍摄当天需要支付剩余拍摄费，您可通过微信、支付宝、刷卡等多种付款方式付款。</span>
              <span
                class="distance"
              >如有疑问随时咨询服务人员，或者直接拨打负责人电话15802421896（大鹏）我们将一如既往的为您提供最优质的作品和服务，如您对我的服务与质量等任何环节存在不满请随时指出</span>
              <span>我会非常感谢您帮助我们成长进步！</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  staffList, // 获取职位下员工详细
  comboList,
  customerList,
  customerAdd,
  customerUpdate,
  customerDelete
} from '@/api/api'
// import tableC from '@/components/Table/index'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Customer',

  components: { Pagination },
  data() {
    return {
      // 分页
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        name: ''
      },
      btnLoading: false,
      dialogFormVisible: false,
      title1: '',
      // name: '',
      tel: '',
      value: '',
      valueState: '',
      // state: '0',
      form: {
        state: '0',
        id: '',
        name: '',
        phone: '',
        address: '',
        networkService: '',
        payment: '',
        combo: {
          id: ''
        },
        customerConsultant: {
          id: ''
        },
        photographer: {
          id: ''
        },
        designer: {
          id: ''
        },
        dresser: {
          id: ''
        },
        firstAid: {
          id: ''
        },
        secondAid: {
          id: ''
        },
        remark: '',
        subscribeTime: '',
        shootTime: '',
        selectTime: '',
        finalizeTime: '',
        deliveryTime: '',
        weddingTime: '',
        customerConsultantCommission: '',
        photographerCommission: '',
        designerCommission: '',
        dresserCommission: '',
        firstAidCommission: '',
        secondAidCommission: '',
        shootAddress: '',
        shootClothing: '',
        include: '',
        style: '',
        special: '',
        photo: '',
        gift1: '',
        gift2: '',
        gift3: ''
      },
      options: [
        {
          value: '选项1',
          label: '石家庄'
        },
        {
          value: '选项2',
          label: '北京'
        }
      ],
      optionsState: [
        {
          value: 'state1',
          label: '待确定拍摄日期'
        },
        {
          value: 'state2',
          label: '待拍摄'
        },
        {
          value: 'state3',
          label: '选片中'
        },
        {
          value: 'state4',
          label: '设计中'
        },
        {
          value: 'state5',
          label: '制作中'
        }
      ],
      optionsCombo: [],
      value1: '', // 日期
      value2: '', // 日期
      value3: '', //
      valueCombo: '',
      input: '', // 手机号
      input1: '', // 客户名称
      // 表格数据
      tableData: [],
      staffData: [],
      customerConsultant1: [], // 客户顾问
      photographer1: [], // 摄影师
      designer1: [], // 设计师
      dresser1: [], // 化妆师
      firstAid1: [], // 助理一
      secondAid1: [] // 助理二
    }
  },
  created() {
    this.getList()
    this.getComboList()
    this.getStaffList()
  },
  methods: {
    // select下拉事件
    changeOrder(val) {
      // console.log(val)
    },
    changeState(val) {
      if (val === 'state1') {
        this.tableData = this.tableDataAll.filter((el) => el.state === 0)
      } else if (val === 'state2') {
        this.tableData = this.tableDataAll.filter((el) => el.state === 1)
      } else if (val === 'state3') {
        this.tableData = this.tableDataAll.filter((el) => el.state === 2)
      } else if (val === 'state4') {
        this.tableData = this.tableDataAll.filter((el) => el.state === 3)
      } else if (val === 'state5') {
        this.tableData = this.tableDataAll.filter((el) => el.state === 4)
      } else if (val === '') {
        this.tableData = this.tableDataAll
      }
    },
    // 获取职位下员工详细
    getStaffList() {
      const params = {
        name: this.name !== '' ? this.name : undefined
      }
      // staffList({ name: this.name })
      staffList(params)
        .then((response) => {
          this.staffData = response.data.data
          this.customerConsultant1 = this.staffData.filter(
            (el) => el.position.id === 2
          )
          this.photographer1 = this.staffData.filter(
            (el) => el.position.id === 4
          )
          this.designer1 = this.staffData.filter((el) => el.position.id === 5)
          this.dresser1 = this.staffData.filter((el) => el.position.id === 6)
          this.firstAid1 = this.staffData.filter((el) => el.position.id === 7)
          this.secondAid1 = this.staffData.filter((el) => el.position.id === 7)
        })
        .catch(() => {
          this.staffData = []
        })
    },
    // 获取套系数据
    getComboList() {
      comboList()
        .then((response) => {
          this.optionsCombo = response.data.data
          // console.log(this.optionsCombo)
        })
        .catch(() => {
          this.optionsCombo = []
        })
    },
    getList() {
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit
      }
      const params1 = {
        // name: this.name !== '' ? this.name : undefined
        name: this.listQuery.name !== '' ? this.listQuery.name : undefined
      }
      customerList(params, params1)
        .then((response) => {
          this.tableData = response.data.data.currentList
          this.tableDataAll = response.data.data.currentList
          this.total = response.data.data.totalRecords
        })
        .catch(() => {
          this.tableData = []
        })
    },
    // 新建
    addShop() {
      this.dialogFormVisible = true
      this.form.state = '0'
      this.form.id = ''
      this.form.name = ''
      this.form.phone = ''
      this.form.address = ''
      this.form.networkService = ''
      this.form.payment = ''
      this.form.combo.id = ''
      this.form.customerConsultant.id = ''
      this.form.photographer.id = ''
      this.form.designer.id = ''
      this.form.dresser.id = ''
      this.form.firstAid.id = ''
      this.form.secondAid.id = ''
      this.form.remark = ''
      this.title1 = '新增收支'
      this.form.subscribeTime = ''
      this.form.shootTime = ''
      this.form.selectTime = ''
      this.form.finalizeTime = ''
      this.form.deliveryTime = ''
      this.form.weddingTime = '' // 日期end
      this.form.customerConsultantCommission = ''
      this.form.photographerCommission = ''
      this.form.designerCommission = ''
      this.form.dresserCommission = ''
      this.form.firstAidCommission = ''
      this.form.secondAidCommission = '' // 提成end
      this.form.shootAddress = ''
      this.form.shootClothing = ''
      this.form.include = ''
      this.form.style = ''
      this.form.special = ''
      this.form.photo = ''
      this.form.gift1 = '0&|&0&|&0'.split('&|&')
      this.form.gift2 = '0&|&0&|&0'.split('&|&')
      this.form.gift3 = '0&|&0&|&0'.split('&|&')
    },
    // 编辑
    getEditData(data) {
      // console.log(this.form.gift1)
      this.dialogFormVisible = true
      this.form.state = data.state
      this.form.id = data.id
      this.form.name = data.name
      this.form.phone = data.phone
      this.form.address = data.address
      this.form.networkService = data.networkService
      this.form.payment = data.payment
      this.form.combo.id = data.combo.id
      this.form.customerConsultant.id = data.customerConsultant.id
      this.form.photographer.id = data.photographer.id
      this.form.designer.id = data.designer.id
      this.form.dresser.id = data.dresser.id
      this.form.firstAid.id = data.firstAid.id
      this.form.secondAid.id = data.secondAid.id
      this.form.remark = data.remark
      this.title1 = '编辑客户'
      this.form.subscribeTime = data.subscribeTime
      this.form.shootTime = data.shootTime
      this.form.selectTime = data.selectTime
      this.form.finalizeTime = data.finalizeTime
      this.form.deliveryTime = data.deliveryTime
      this.form.weddingTime = data.weddingTime // 日期end
      this.form.customerConsultantCommission =
        data.customerConsultantCommission
      this.form.photographerCommission = data.photographerCommission
      this.form.designerCommission = data.designerCommission
      this.form.dresserCommission = data.dresserCommission
      this.form.firstAidCommission = data.firstAidCommission
      this.form.secondAidCommission = data.secondAidCommission // 提成end
      this.form.shootAddress = data.shootAddress
      this.form.shootClothing = data.shootClothing
      this.form.include = data.include
      this.form.style = data.style
      this.form.special = data.special
      this.form.photo = data.photo
      this.form.gift1 = data.gift1.split('&|&')
      // this.form.gift1 = this.form.gift1.join('&|&')
      this.form.gift2 = data.gift2.split('&|&')
      this.form.gift3 = data.gift3.split('&|&')
    },
    // 编辑新增确定事件
    addSubmit() {
      // console.log(this.form)

      if (this.form.id) {
        this.form.gift1 = this.form.gift1.join('&|&')
        this.form.gift2 = this.form.gift2.join('&|&')
        this.form.gift3 = this.form.gift3.join('&|&')
        if (this.form.shootTime === '') {
          this.form.state = '0'
        } else if (this.form.shootTime !== '' && this.form.selectTime === '') {
          this.form.state = '1'
        } else if (
          this.form.selectTime !== '' &&
          this.form.finalizeTime === ''
        ) {
          this.form.state = '2'
        } else if (
          this.form.finalizeTime !== '' &&
          this.form.deliveryTime === ''
        ) {
          this.form.state = '3'
        } else if (this.form.deliveryTime !== '') {
          this.form.state = '4'
        }
        customerUpdate(this.form)
          .then(() => {
            this.$notify.success({
              title: '成功',
              message: '记录修改成功'
            })
            this.dialogFormVisible = false
            this.getList()
          })
          .catch((response) => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
      } else {
        this.form.gift1 = this.form.gift1.join('&|&')
        this.form.gift2 = this.form.gift2.join('&|&')
        this.form.gift3 = this.form.gift3.join('&|&')
        if (this.form.shootTime === '') {
          this.form.state = '0'
        } else if (this.form.shootTime !== '' && this.form.selectTime === '') {
          this.form.state = '1'
        } else if (
          this.form.selectTime !== '' &&
          this.form.finalizeTime === ''
        ) {
          this.form.state = '2'
        } else if (
          this.form.finalizeTime !== '' &&
          this.form.deliveryTime === ''
        ) {
          this.form.state = '3'
        } else if (this.form.deliveryTime !== '') {
          this.form.state = '4'
        }
        customerAdd(this.form)
          .then(() => {
            this.$notify.success({
              title: '成功',
              message: '记录添加成功'
            })
            this.dialogFormVisible = false
            this.getList()
          })
          .catch((response) => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
      }
    },
    // 删除
    delData(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.id
          }
          customerDelete(params)
            .then((response) => {
              this.$notify.success({
                title: '成功',
                message: '记录删除成功'
              })
              this.getList()
            })
            .catch((response) => {
              this.$notify.error({
                title: '失败',
                message: response.data.message
              })
            })
        })
        .catch(() => {
          this.$notify.error({
            title: '取消',
            message: '已取消删除'
          })
        })
    },
    // 导出表格
    handleDownload() {
      //   this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = [
          'ID',
          '名称',
          '联系电话',
          '家庭住址',
          '门店',
          '订单类别',
          '订单金额',
          '交付日期'
        ]
        const filterVal = [
          'id',
          'name',
          'phone',
          'address',
          'store',
          'address',
          'payment',
          'deliveryTime'
        ]
        excel.export_json_to_excel2(
          tHeader,
          this.tableData,
          filterVal,
          '客户管理'
        )
        this.downloadLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
@rem: 1920/100rem;
#app {
  box-sizing: border-box;
  padding-left: 30 / @rem;
  padding-top: 30 / @rem;
  .tablee {
    margin-top: 20 / @rem;
  }
  input {
    border: none;
    outline: medium;
  }
  .content1 input {
    width: 80%;
    border: none;
    outline: medium;
  }
  .like1 input {
    // width: 80%;
    border: none;
    outline: medium;
  }
  .card {
    border: 2 / @rem solid #cccccc;
    width: 1400 / @rem;
    border-collapse: collapse;
    .give {
      border-right: 2 / @rem solid #cccccc;
      border-bottom: 2 / @rem solid #cccccc;
      height: 120 / @rem;
      line-height: 120 / @rem;
      text-align: center;
    }
    .give1 {
      div {
        height: 30 / @rem;
        line-height: 30 / @rem;
        text-align: center;
        border-right: 2 / @rem solid #cccccc;
        border-bottom: 2 / @rem solid #cccccc;
      }
    }
    .give2 {
      div {
        height: 30 / @rem;
        line-height: 30 / @rem;
        text-align: center;
        border-bottom: 2 / @rem solid #cccccc;
      }
    }
    .content {
      border-right: 2 / @rem solid #cccccc;
      border-bottom: 2 / @rem solid #cccccc;
      height: 90 / @rem;
      line-height: 90 / @rem;
      text-align: center;
    }
    .content1 {
      div {
        line-height: 30 / @rem;
        height: 30 / @rem;
        border-bottom: 2 / @rem solid #cccccc;
      }
    }
    .like {
      border-right: 2 / @rem solid #cccccc;
      border-bottom: 2 / @rem solid #cccccc;
      height: 30 / @rem;
      line-height: 30 / @rem;
      text-align: center;
    }
    .like1 {
      div {
        line-height: 30 / @rem;
        height: 30 / @rem;
        border-bottom: 2 / @rem solid #cccccc;
        span {
          display: inline-block;
          width: 400 / @rem;
        }
      }
    }
    .project {
      div {
        line-height: 30 / @rem;
        text-align: center;
        height: 30 / @rem;
        border-bottom: 2 / @rem solid #cccccc;
        border-right: 2 / @rem solid #cccccc;
        span {
          display: inline-block;
          width: 400 / @rem;
        }
      }
    }
    .project1 {
      div {
        text-align: center;
        line-height: 30 / @rem;
        height: 30 / @rem;
        border-bottom: 2 / @rem solid #cccccc;
        border-right: 2 / @rem solid #cccccc;
        span {
          display: inline-block;
          width: 400 / @rem;
        }
      }
    }
    .project2 {
      div {
        text-align: center;
        line-height: 30 / @rem;
        height: 30 / @rem;
        border-bottom: 2 / @rem solid #cccccc;
        span {
          display: inline-block;
          width: 400 / @rem;
        }
      }
    }
    .careful {
      border-right: 2 / @rem solid #cccccc;
      // border-bottom: 2 / @rem solid #cccccc;
      height: 400 / @rem;
      line-height: 400 / @rem;
      text-align: center;
    }
    .careful1 {
      div {
        line-height: 30 / @rem;
        height: 400 / @rem;
        padding: 10 / @rem;
        // border-bottom: 2 / @rem solid #cccccc;
        span {
          display: block;
        }
      }
      .distance {
        margin-top: 30 / @rem;
      }
    }
  }
}
</style>
