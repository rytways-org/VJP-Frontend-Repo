/*
 * This source file was generated by FireStorm/DAO.
 * 
 * If you purchase a full license for FireStorm/DAO you can customize this header file.
 * 
 * For more information please visit http://www.codefutures.com/products/firestorm
 */

package com.rytways.nsn.db.factory;

import java.sql.Connection;
import com.rytways.nsn.db.dao.*;
import com.rytways.nsn.db.jdbc.*;

public class LogindetailsviewDaoFactory
{
	/**
	 * Method 'create'
	 * 
	 * @return LogindetailsviewDao
	 */
	public static LogindetailsviewDao create()
	{
		return new LogindetailsviewDaoImpl();
	}

	/**
	 * Method 'create'
	 * 
	 * @param conn
	 * @return LogindetailsviewDao
	 */
	public static LogindetailsviewDao create(Connection conn)
	{
		return new LogindetailsviewDaoImpl( conn );
	}

}