import qs from 'qs';
const AskPost = (ajaxinstance) => {
    const customer = {}
    customer.Login = (name,zone,code) => {
        return ajaxinstance.post('Second/index',qs.stringify({
          name,zone,code
        }));
      }
    customer.isLogin = (url) => {
        return ajaxinstance.post('index/GetCodeUrl',qs.stringify({
          url
        }));
      }
    customer.getQuestionGrade = () => {
        return ajaxinstance.post('Second/getType');
      }
    customer.AnswerQuestion = (choose) => {
        return ajaxinstance.post('Second/addChoose',qs.stringify({
          choose
        }));
      }
    customer.GuessDate = (date) => {
        return ajaxinstance.post('Second/addCompete',qs.stringify({
          date
        }));
      }
    customer.getCountTime = () => {
      return ajaxinstance.post('Second/getCountTime');
    }
    return customer
  }
  
  export default AskPost