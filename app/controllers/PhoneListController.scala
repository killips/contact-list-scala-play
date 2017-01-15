package controllers

import javax.inject._

import models.{DB, Phone}
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc._
import sorm.Dsl._
/**
  * Created by User on 13.01.2017.
  */
@Singleton
class PhoneListController @Inject()  extends Controller {
  def phoneList = Action{
    Ok(views.html.index("Hello World"))
  }
  val phoneForm = Form(
  mapping(
    "name" -> text,
    "phoneNumber" -> text
    )(Phone.apply)(Phone.unapply)
  )
  def addPhone = Action { implicit request =>
      val phone = phoneForm.bindFromRequest.get
      DB.save(phone)
      Redirect(routes.PhoneListController.phoneList())
  }

  def getPhones = Action{
      val phones = DB.query[Phone].fetch()
      Ok(Json.toJson(phones))
  }

  def deletPhone = Action{  implicit request =>
    val phone = phoneForm.bindFromRequest.get
    Redirect(routes.PhoneListController.phoneList())
  }

  def searchPhone = Action{ //implicit request =>
    //val requestSearch = phoneForm.bindFromRequest.get
    val respons = DB.query[Phone].where("name" equal "Igor").fetch()
    Ok(Json.toJson(respons))
  }
}
