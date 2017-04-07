package com.allstate.exception;

import com.allstate.model.User;

/**
 * Created by localadmin on 4/6/17.
 */
public class UserNotFoundException extends Exception{


    public UserNotFoundException()
    {
        super ();
    }

    public UserNotFoundException(String msg)
    {
        super (msg);
    }


}
