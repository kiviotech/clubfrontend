import apiClient from "../apiClient";
import designerShowCaseEndpoints from "../endpoints/designerShowCaseEndpoints";

export const getDesignerShowcases = () => 
    apiClient.get(designerShowCaseEndpoints.getDesignerShowcases);

export const getDesignerShowcaseById = (id) =>
  apiClient.get(designerShowCaseEndpoints.getDesignerShowcaseById(id));

export const createDesignerShowcase = (data) =>
  apiClient.post(designerShowCaseEndpoints.createDesignerShowcase, data);

export const updateDesignerShowcase = (id, data) =>
  apiClient.put(designerShowCaseEndpoints.updateDesignerShowcase(id), data);

export const deleteDesignerShowcase = (id) =>
  apiClient.delete(designerShowCaseEndpoints.deleteDesignerShowcase(id));