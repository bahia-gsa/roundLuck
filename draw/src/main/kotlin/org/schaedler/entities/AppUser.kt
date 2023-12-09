package org.schaedler.entities

import io.quarkus.hibernate.orm.panache.PanacheEntity


open class AppUser : PanacheEntity() {
    open var id : String? = null
    open var name: String? = null
    open var email: String? = null
}