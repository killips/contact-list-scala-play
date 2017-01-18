package models

import sorm._

/**
  * Created by User on 13.01.2017.
  */
object DB extends Instance(entities = Seq(Entity[Contact]()), url = "jdbc:h2:mem:test")
