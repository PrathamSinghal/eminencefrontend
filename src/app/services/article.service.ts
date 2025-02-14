import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _httpClient: HttpClient) { }

  // ========== Article Category ============
  createCategory(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/createArticleCategory`, payload);
  }
  updateCategory(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/updateArticleCategory`, payload);
  }
  deleteCategory(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/deleteArticleCategory`, payload);
  }
  blockUnblockCategory(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/blockUnblockArticleCategory`, payload);
  }
  getCategory(payload: any) {
    return this._httpClient.get(`${environment.base}admin/private/getArticleCategories?search=${payload?.queryParam?.search}&page=${payload?.queryParam?.page}&limit=${payload?.queryParam?.limit}`);
  }
  getAllCategory() {
    return this._httpClient.get(`${environment.base}admin/private/getAllArticleCategory`);
  }
  getCategoryById(payload: any) {
    return this._httpClient.get(`${environment.base}admin/private/getArticleCategory/${payload?.id}`);
  }

  // ========== Article Poll ============
  createPoll(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/createArticlePoll`, payload);
  }
  updatePoll(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/updateArticlePoll`, payload);
  }
  getPollById(payload: any) {
    return this._httpClient.get(`${environment.base}admin/private/getPoll/${payload?.id}`);
  }
  getPoll(payload: any) {
    return this._httpClient.get(`${environment.base}admin/private/getArticlePolls?search=${payload?.queryParam?.search}&page=${payload?.queryParam?.page}&limit=${payload?.queryParam?.limit}&startDate=${payload?.queryParam?.startDate}&endDate=${payload?.queryParam?.endDate}&pollId=${payload?.queryParam?.pollId}`);
  }
  deletePoll(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/deleteArticlePolls`, payload);
  }
  getAllPoll() {
    return this._httpClient.get(`${environment.base}admin/private/getAllArticlePoll`);
  }

  // ========== Article ============
  createArticle(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/createArticle`, payload);
  }
  updateArticle(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/updateArticle`, payload);
  }
  deleteArticle(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/deleteArticle`, payload);
  }
  getArticle(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/getArticles?search=${payload?.queryParam?.search}&page=${payload?.queryParam?.page}&limit=${payload?.queryParam?.limit}`, payload?.body);
  }
  getAllArticle() {
    return this._httpClient.get(`${environment.base}admin/private/getAllArticle`);
  }
  getArticleById(payload: any) {
    return this._httpClient.get(`${environment.base}admin/private/getArticle/${payload?.id}`);
  }


  getAllDepartmentList() {
    return this._httpClient.get(`${environment.base}admin/private/getAllDepartment`);
  }
  getAllAuthors() {
    return this._httpClient.get(`${environment.base}admin/private/getAuthors`);
  }
  getAllAuthorsByDeptIds(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/getTeamsOfDepartment`, payload);
  }
  getAllAuthorsByDeptId(payload: any) {
    return this._httpClient.get(`${environment.base}admin/private/getAuthors/${payload?.id}`);
  }
  teamExists() {
    return this._httpClient.get(`${environment.base}admin/private/teamExists`);
  }

  // ========== Engagement Details ============
  getEngagementDetails(payload: any, engageId: any) {
    return this._httpClient.post(`${environment.base}admin/private/getAllArticleLikeComments/${engageId}?search=${payload?.queryParam?.search}&page=${payload?.queryParam?.page}&limit=${payload?.queryParam?.limit}`, payload?.body);
  }
}


