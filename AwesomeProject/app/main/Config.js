export default class Config{

   //用户登录状态更新广播 
   static UPDATE_USER_LOGIN_INFO = 'UPDATE_USER_LOGIN_INFO';

   //社区管理用来跳转的广播
   static USER_FRAGMENT_COMMUNITY_CHANGE = "USER_FRAGMENT_COMMUNITY_CHANGE";

   static IS_LOGIN = false;
   static LOGIN_USER_NAME = null;
   static LOGIN_USER_ID = null;
   static SESSION_TOKEN = null;
   static JOINED_USER_COMMUNITY_ID = null;
   static authentication = false;
   static apply_for_id = null;
   static apply_for_name = null;
   static create_community_id = null;//管理员创建的社区id
   
   static BMOB_APP_ID = '6ff9c68a13e661734e423db5c32da5e8';
   static REST_API_ID = 'b1af538d4e7e039a876546bdc8cd121b';

   static json_ip_data = null;
   static json_epidemic_data = null;
   static user = null;
   static apply_state = null;//申请状态

   static city = '';
   static city_code = 0;

   static IS_ROOT = false;//是否为管理员
}