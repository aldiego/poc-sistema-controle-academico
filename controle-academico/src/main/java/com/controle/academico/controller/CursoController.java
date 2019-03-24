package com.controle.academico.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.controle.academico.model.Curso;

@Controller
public class CursoController {

  private Set<Curso> cursos = new HashSet<>();

  @GetMapping("/curso")
  @ResponseBody
  public Optional<Curso> getEmployee(@RequestParam String email) {
    return cursos.stream().filter(x -> x.getEmail().equals(email)).findAny();
  }

  @PostMapping(value = "/curso", consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.CREATED)
  public void postMessage(@RequestBody Curso curso) {
    cursos.add(curso);
  }

}
