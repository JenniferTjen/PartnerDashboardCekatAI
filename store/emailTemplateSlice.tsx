import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '@/utils/http';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabaseClient';
const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/email_template`;

interface AuthState {
    loading: string;
    error: any;
}

const initialState: AuthState = {
    loading: '',
    error: null,
};

export const getEmailTemplates = createAsyncThunk('emailTemplate/getEmailTemplates', async () => {
    try {
        const response = await http.get(endpoint);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

export const createEmailTemplate = createAsyncThunk('emailTemplate/createEmailTemplate', async (payload: any) => {
    try {
        const response = await http.post(`${endpoint}/create`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateEmailTemplate = createAsyncThunk('emailTemplate/updateEmailTemplate', async (payload: any) => {
    try {
        const response = await http.put(`${endpoint}/update`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
});

const emailTemplateSlice = createSlice({
    name: 'emailTemplate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEmailTemplates.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(getEmailTemplates.fulfilled, (state, action) => {
            state.loading = 'succeeded';
        });
        builder.addCase(getEmailTemplates.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
        builder.addCase(createEmailTemplate.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(createEmailTemplate.fulfilled, (state, action) => {
            state.loading = 'succeeded';
        });
        builder.addCase(createEmailTemplate.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export default emailTemplateSlice.reducer;
