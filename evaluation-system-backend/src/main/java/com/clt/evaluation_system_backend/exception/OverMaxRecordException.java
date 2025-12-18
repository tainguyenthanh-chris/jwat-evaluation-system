package com.clt.evaluation_system_backend.exception;

import com.clt.evaluation_system_backend.util.Constant;

public class OverMaxRecordException extends RuntimeException {
    public OverMaxRecordException() {
        super("Over " + Constant.MAX_RECORD_A_DAY + " records a day");
    }
}

