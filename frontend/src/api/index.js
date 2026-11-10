import axios from 'axios'; import {config,mockResult} from '../mock/data';
const api=axios.create({baseURL:import.meta.env.VITE_API_BASE_URL||'',timeout:10000,headers:{'Content-Type':'application/json'},withCredentials:true});
api.interceptors.response.use(r=>r.data,e=>Promise.reject(new Error(e.response?.data?.message||e.message||'网络请求失败')));
const mock=import.meta.env.VITE_USE_MOCK==='true';
export async function getConfig(){if(mock)return config;try{return await api.get('/api/config')}catch{return config}}
export async function createTest(payload){if(mock)return new Promise(r=>setTimeout(()=>r({id:'mock-test',status:'completed',results:mockResult(payload.models)}),700));try{return await api.post('/api/tests',payload)}catch{return {id:'mock-test',status:'completed',results:mockResult(payload.models)}}}
export const getTest=id=>api.get(`/api/tests/${id}`); export const getTests=()=>api.get('/api/tests'); export const getCases=()=>api.get('/api/cases'); export const getStats=()=>api.get('/api/stats');
