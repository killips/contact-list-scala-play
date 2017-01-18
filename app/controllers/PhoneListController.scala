package controllers

import play.api.mvc._
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.{JsValue, Json}
import models._
import sorm.Dsl._
import javax.inject._
/**
  * Created by User on 13.01.2017.
  */
@Singleton
class PhoneListController @Inject() extends Controller {

  val addForm = Form(
    mapping(
      "name" -> text,
      "phoneNumber" -> text
    )(Contact.apply)(Contact.unapply)
  )

  val searchForm = Form(
    mapping(
      "searchText" -> text
    )(Search.apply)(Search.unapply)
  )

  val deletForm = Form(
    mapping(
      "deletContact" -> text
    )(Delet.apply)(Delet.unapply)
  )

  def index = Action{
    val phones = DB.query[Contact].fetch()
   // phones.toList(1).name
    Ok(views.html.index(phones.toArray[Contact]))
  }

  def addContact = Action { implicit request =>
      val phone = addForm.bindFromRequest.get
      if(DB.query[Contact].where(("name" equal phone.name) or ("phoneNumber" equal phone.phoneNumber)).fetch().toArray.length == 0) {
        DB.save(phone)
        Ok(Json.toJson(phone))
      }else{
        val json: JsValue = Json.obj(
          "errorMessage" -> "This entry exists"
        )
        Ok(json)
      }
  }
  def deletContact = Action{ implicit request =>
    val delet = deletForm.bindFromRequest.get
    DB.delete(DB.query[Contact].where(("name" equal  delet.delet)).fetchOne().get)
    Ok("")
  }
  def searchContact = Action{ implicit request =>
    val requestSearch = searchForm.bindFromRequest.get
    val searchPhone = if(requestSearch.text.isEmpty){ DB.query[Contact].fetch() }else { DB.query[Contact].where(("name" regex  requestSearch.text)).fetch() }
    Ok(Json.toJson(searchPhone))
  }
}
