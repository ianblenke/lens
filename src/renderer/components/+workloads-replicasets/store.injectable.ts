/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import getPodsByOwnerIdInjectable from "../+workloads-pods/get-pods-by-owner-id.injectable";
import replicaSetApiInjectable from "../../../common/k8s-api/endpoints/replica-set.api.injectable";
import storesAndApisCanBeCreatedInjectable from "../../stores-apis-can-be-created.injectable";
import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/manager.injectable";
import { ReplicaSetStore } from "./store";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import loggerInjectable from "../../../common/logger.injectable";

const replicaSetStoreInjectable = getInjectable({
  id: "replica-set-store",
  instantiate: (di) => {
    assert(di.inject(storesAndApisCanBeCreatedInjectable), "replicaSetStore is only available in certain environments");

    const api = di.inject(replicaSetApiInjectable);

    return new ReplicaSetStore({
      getPodsByOwnerId: di.inject(getPodsByOwnerIdInjectable),
      context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
      logger: di.inject(loggerInjectable),
    }, api);
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default replicaSetStoreInjectable;
