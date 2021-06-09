export default class Config{

   

   //更新出入申请信息
   static UPDATE_OUT_AND_IN_INFO = 'UPDATE_OUT_AND_IN_INFO';

   //更新失物招领信息
   static UPDATE_LOST_INFO = 'UPDATE_LOST_INFO';

   //用户登录状态更新广播 
   static UPDATE_USER_LOGIN_INFO = 'UPDATE_USER_LOGIN_INFO';

   //社区管理用来跳转的广播
   static USER_FRAGMENT_COMMUNITY_CHANGE = "USER_FRAGMENT_COMMUNITY_CHANGE";

   //退出登录的广播
   static USER_OUT_LOGIN_IN = 'USER_OUT_LOGIN_IN';

   //认证的广播
   static AUTHENTICATION = 'AUTHENTICATION';

   static IS_LOGIN = false;
   static LOGIN_USER_NAME = null;
   static LOGIN_USER_ID = null;
   static SESSION_TOKEN = null;
   static JOINED_USER_COMMUNITY_ID = null;
   static authentication = false;
   static apply_for_id = null;
   static apply_for_name = null;
   static create_community_id = null;//管理员创建的社区id
   static USER_POST = null;//社区的职位
   
   static BMOB_APP_ID = '填入自己的bmob的id';
   static REST_API_ID = '填入自己的bmob的rest api id';

   static json_ip_data = null;
   static json_epidemic_data = null;
   static user = null;
   static apply_state = null;//申请状态
   static epidmic = null;//疫情信息
   static policy = null;//隔离政策信息

   static city = '';
   static city_code = 0;

   static IS_ROOT = false;//是否为管理员
}