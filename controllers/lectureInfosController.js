import LectureInfoService from "../services/LectureInfosService";
import Util from "../utils/Utils";

const util = new Util();

class LectureInfoController {
  static async getAllLectureInfos(req, res) {
    try {
      const data = await LectureInfoService.getAllLectureInfos();
      console.log(data);
      if (data.length > 0) {
        util.setSuccess(200, "lecture information retrieved", data);
      } else {
        util.setSuccess(200, "No information found");
      }
      return util.send(res);
    } catch (err) {
      console.error(err);
      util.setError(500, err);
      return util.send(res);
    }
  }
}

export default LectureInfoController;
