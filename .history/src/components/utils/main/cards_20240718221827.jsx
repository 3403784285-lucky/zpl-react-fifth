2024-07-18 22:18:14.674 ERROR 26076 --- [0.0-8086-exec-2] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is org.springframework.web.multipart.MultipartException: Failed to parse multipart servlet request; nested exception is java.io.IOException: org.apache.tomcat.util.http.fileupload.FileUploadException: the request was rejected because no multipart boundary was found] with root cause

org.apache.tomcat.util.http.fileupload.FileUploadException: the request was rejected because no multipart boundary was found
	at org.apache.tomcat.util.http.fileupload.impl.FileItemIteratorImpl.init(FileItemIteratorImpl.java:189) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.util.http.fileupload.impl.FileItemIteratorImpl.getMultiPartStream(FileItemIteratorImpl.java:205) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.util.http.fileupload.impl.FileItemIteratorImpl.findNextItem(FileItemIteratorImpl.java:224) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.util.http.fileupload.impl.FileItemIteratorImpl.<init>(FileItemIteratorImpl.java:142) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.util.http.fileupload.FileUploadBase.getItemIterator(FileUploadBase.java:252) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.util.http.fileupload.FileUploadBase.parseRequest(FileUploadBase.java:276) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.connector.Request.parseParts(Request.java:2932) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.connector.Request.getParts(Request.java:2834) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.connector.RequestFacade.getParts(RequestFacade.java:1098) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.springframework.web.multipart.support.StandardMultipartHttpServletRequest.parseRequest(StandardMultipartHttpServletRequest.java:95) ~[spring-web-5.3.22.jar:5.3.22]
	at org.springframework.web.multipart.support.StandardMultipartHttpServletRequest.<init>(StandardMultipartHttpServletRequest.java:88) ~[spring-web-5.3.22.jar:5.3.22]
	at org.springframework.web.multipart.support.StandardServletMultipartResolver.resolveMultipart(StandardServletMultipartResolver.java:122) ~[spring-web-5.3.22.jar:5.3.22]
	at org.springframework.web.servlet.DispatcherServlet.checkMultipart(DispatcherServlet.java:1208) ~[spring-webmvc-5.3.22.jar:5.3.22]
	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1042) ~[spring-webmvc-5.3.22.jar:5.3.22]
	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:963) ~[spring-webmvc-5.3.22.jar:5.3.22]
	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006) ~[spring-webmvc-5.3.22.jar:5.3.22]
	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:909) ~[spring-webmvc-5.3.22.jar:5.3.22]
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:681) ~[tomcat-embed-core-9.0.65.jar:4.0.FR]
	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883) ~[spring-webmvc-5.3.22.jar:5.3.22]
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:764) ~[tomcat-embed-core-9.0.65.jar:4.0.FR]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:227) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53) ~[tomcat-embed-websocket-9.0.65.jar:9.0.65]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-5.3.22.jar:5.3.22]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:117) ~[spring-web-5.3.22.jar:5.3.22]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:197) ~[tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:97) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:541) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:135) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:78) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:360) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:890) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1789) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1191) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:659) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) [tomcat-embed-core-9.0.65.jar:9.0.65]
	at java.lang.Thread.run(Thread.java:750) [na:1.8.0_362]

