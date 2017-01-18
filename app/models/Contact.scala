package models

import play.api.libs.json.Json

/**
  * Created by User on 13.01.2017.
  */
case class Contact(name: String, phoneNumber: String)

object Contact{
  implicit val phoneFormat = Json.format[Contact]
}