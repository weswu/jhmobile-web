<%@page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="frame" tagdir="/WEB-INF/tags"%>
<script type="text/javascript" src="http://www.jihui88.com/js/jquery.js"></script>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
session:${sessionScope.abbcc}
<div class="container-fluid">
    <div class="panel panel-default">
        <div class="panel-heading">用户列表</div>
        <c:if test="${page.content != null}">
        <table class="table table-condensed table-striped table-bordered table-hover">
            <thead>
            <tr>
                <th class="col-no">序号</th>
                <th>编号</th>
                <th>用户名</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${page.content}" var="user" varStatus="status">
                <tr>
                    <td>${status.count}</td>
                    <td>${user.userId}</td>
                    <td><a href="${ctx}/user/view/${user.userId}">${user.name}</a></td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
        </c:if>
    </div>
    <frame:pagination page="${page}" />
</div>