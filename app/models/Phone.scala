package models

import play.api.libs.json.Json

/**
  * Created by User on 13.01.2017.
  */
case class Phone(name: String, phoneNumber: String)

object Phone{

  implicit val phoneFormat = Json.format[Phone]
}